import { Injectable } from '@angular/core';
import { Alarm } from './alarm.model';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable'
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  private doc: jsPDF;
  private offset: { x: number, y: number };

  private readonly mmToPoints: number = 2.83465;

  constructor() {
    this.offset = { x: 40, y: 40 + 61.3 };
  }

  public create(alarm: Alarm) {
    this.initDocument();
    this.drawBackground();
    (this.doc.internal as any).events.subscribe('addPage', () => this.drawBackground());
    this.doc.setFontSize(14);

    // Print data
    const others = alarm.alarmedBy === 'LWZ/BWST'
      ? alarm.alarmedBy
      : `${alarm.alarmedBy} (${alarm.others})`;
    let tableData = [
      ['Alarmart:', alarm.alarmType, 'Alarmiert von:', others],
      ['Einsatzort:', alarm.location, 'Gemeinde:', alarm.parish],
      ['Nebenaktivität:', alarm.sideActivity, 'Wetter:', alarm.weather, '', '']
    ];
    this.drawTable(tableData, this.getColumnsConfiguration(tableData));

    // Print involved
    tableData = [];
    if (alarm.involved[0] != null || alarm.involved[1] != null)
      tableData.push(['Verletzte Personen:', alarm.involved[0], 'Getötete Personen:', alarm.involved[1]]);
    if (alarm.involved[2] != null || alarm.involved[3] != null)
      tableData.push(['Verletzte Tiere:', alarm.involved[2], 'Getötete Tiere:', alarm.involved[3]]);

    this.drawTable(tableData, this.getColumnsConfiguration(tableData));

    // Print times
    tableData = [['Alarmiert:', this.formatDateTime(alarm.alarmed)]];
    if (alarm.engaged !== null)
      tableData.push(['Ausgerückt:', this.formatDateTime(alarm.engaged)]);
    if (alarm.reached !== null)
      tableData.push(['1. Fahrzeug am Einsatzort:', this.formatDateTime(alarm.reached)]);
    if (alarm.stop !== null)
      tableData.push(['Alarmstopp:', this.formatDateTime(alarm.stop)]);
    if (alarm.indented !== null)
      tableData.push(['Rückher letztes Fahrzeug:', this.formatDateTime(alarm.indented)]);
    if (alarm.ready !== null)
      tableData.push(['Wieder Einsatzbereit:', this.formatDateTime(alarm.ready)]);
    if (alarm.stop !== null)
      tableData.push(['Brand aus:', this.formatDateTime(alarm.fireOut)]);

    this.drawTable(tableData, this.getColumnsConfiguration(tableData));

    // Print departments and organisations
    const departments = alarm.departments
      .map(department => {
        if (department.isHead)
          return `${department.name} (Einsatzleitung)`;
        return department.name;
      })
      .join(', ');
    tableData = [['Eingesetzte Feuerwehren:', departments]];
    if (alarm.organisations.length !== 0) {
      const organisations = alarm.organisations.join(', ');
      tableData.push(['Eingesetzte Organisationen:', organisations]);
    }

    this.drawTable(tableData, this.getColumnsConfiguration(tableData));

    // Print damage, activities and problem
    tableData = [];
    if (alarm.damage != null && alarm.damage !== '')
      tableData.push(['Schadenslage:', alarm.damage]);
    if (alarm.events != null && alarm.events !== '')
      tableData.push(['Vorkommnisse:', alarm.events]);
    if (alarm.activities != null && alarm.activities !== '')
      tableData.push(['Tätigkeiten:', alarm.activities]);

    this.drawTable(tableData, this.getColumnsConfiguration(tableData));

    // Print devices
    if (alarm.devices.length !== 0) {
      const devices = alarm.devices
        .map(device => `${device.name} (${device.amount})`)
        .join(', ');
      tableData = [['Geräte:', devices]]
      this.drawTable(tableData, this.getColumnsConfiguration(tableData));
    }

    // Print team
    const result = [];
    const copy = [];
    alarm.team.forEach(member => copy.push(Object.assign({}, member)));

    copy.filter(member => member.position !== '')
      .map(member => {
        let vehicle = member.vehicle;
        if (vehicle === '') {
          vehicle = member.position;
          member.position = '';
        }
        return {
          name: member.name,
          vehicle,
          position: member.position
        };
      }).forEach(member => {
        const found = result.find(item => item.vehicle === member.vehicle);
        let help = `${member.name} (${member.position})`;
        if (member.position === '')
          help = member.name
        if (found == null) {
          result.push({
            vehicle: member.vehicle,
            team: [help]
          });
        } else {
          found.team.push(help);
        }
      });

    tableData = result.map(item => {
      return [`${item.vehicle}:`, item.team.join(', ')];
    });

    this.drawTable(tableData, this.getColumnsConfiguration(tableData));

    // Print protocol
    tableData = alarm.protocol.filter(message => message.valid)
      .map(message => {
        const result = [
          moment(message.dateTime).format('HH:mm [(]DD.MM.YYYY[)]'),
          message.value
        ];
        return result;
      });

    this.drawTable(tableData, this.getColumnsConfiguration(tableData));

    this.finishDocument(alarm);

    this.doc.save('test.pdf');
  }

  private drawBackground(): void {
    const background = new Image();
    background.src = environment.backgroundImage;
    this.doc.addImage(background, 'png', 0, 0, 210 * this.mmToPoints, 297 * this.mmToPoints);
  }

  private drawSeperator(lineWidth: number): void {
    this.doc.setLineWidth(lineWidth);
    this.doc.setDrawColor('black');
    this.doc.line(this.offset.x, this.offset.y, this.doc.internal.pageSize.getWidth() - this.offset.x, this.offset.y);
  }

  private drawTable(tableData: string[][], columnStyles: any): void {
    if (tableData.length === 0)
      return;

    this.offset.y += 5;
    autoTable(this.doc, {
      body: tableData,
      bodyStyles: {
        cellPadding: 0,
        fontSize: 12
      },
      columnStyles: columnStyles,
      margin: {
        top: 40 + 65.3
      },
      rowPageBreak: 'avoid',
      startY: this.offset.y,
      theme: 'plain'
    });
    this.offset.y = (this.doc as any).lastAutoTable.finalY + 4;

    this.drawSeperator(1);
  }

  private evaluateColumnWidth(tableData: string[][], column: number): number {
    let colWidth = 0;
    tableData.forEach(data => {
      const help = this.doc.getTextDimensions(data[column]).w;
      if (help > colWidth)
        colWidth = help;
    });

    return colWidth;
  }

  private finishDocument(alarm: Alarm): void {
    const pageCount = this.doc.internal.pages.length - 1;
    for (let i = 1; i <= pageCount; i++) {
      this.doc.setPage(i);
      this.offset = { x: 40, y: 40 };
      this.doc.setFont('Roboto', 'Bold');
      this.doc.setFontSize(10)
        .text(moment().locale('de').format('dddd, DD. MMMM YYYY, HH:mm [Uhr (01-01-02-03)]'), this.offset.x, this.offset.y);
      this.offset.y += this.doc.getLineHeight();

      const img = new Image()
      img.src = alarm.isFire
        ? environment.fireImage
        : environment.technicImage;
      this.doc.addImage(img, 'png', this.offset.x, this.offset.y, 40, 40);

      this.offset.x += 50;
      this.offset.y += 18;
      this.doc.setFontSize(18)
        .text(alarm.id, this.offset.x, this.offset.y);
      this.offset.y += this.doc.getLineHeight() - 5;

      let lineSplit = this.doc.splitTextToSize(alarm.mainActivity, 280);
      this.doc.setFontSize(14)
        .setFont('Roboto', 'Regular')
        .text(lineSplit, this.offset.x, this.offset.y);
      this.offset.y += this.doc.getLineHeight() * lineSplit.length;
      this.offset.x -= 50;

      this.drawSeperator(2);

      const footer = `Seite ${i} von ${pageCount}`;
      this.doc.setFontSize(10)
        .text(footer, 210 * this.mmToPoints - 40 - this.doc.getTextWidth(footer), 297 * this.mmToPoints - 20);
    }
  }

  private formatDateTime(dateTime: Date): string {
    return moment(dateTime).locale('de').format('HH:mm [Uhr] DD. MMMM YYYY (dddd)');
  }

  private getColumnsConfiguration(tableData: string[][]): any {
    const help = tableData[0];
    if (help == null)
      return {};

    const configuration = {};
    for (let i = 0; i < help.length; i += 2) {
      configuration[i] = {
        cellWidth: this.evaluateColumnWidth(tableData, i),
        fontStyle: 'bold'
      }
    }

    return configuration;
  }

  private initDocument(): void {
    this.doc = new jsPDF('p', 'pt', 'a4');
    this.doc.addFont(environment.robotoBold, 'Roboto', 'Bold');
    this.doc.addFont(environment.robotoRegular, 'Roboto', 'Regular');
  }

}
