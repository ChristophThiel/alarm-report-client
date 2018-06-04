import { Component, OnInit } from '@angular/core';
import { Alerted } from '../../models/alerted';

@Component({
  selector: 'app-alerted',
  templateUrl: './alerted.component.html',
  styleUrls: ['./alerted.component.css']
})
export class AlertedComponent implements OnInit {

  private alertedBy: string;
  private elements: Alerted[] = [
    {name: "Feuer", time: ""}
  ];

  private displayedColumns = ['name', 'time'];

  constructor() { 
    this.alertedBy = "0";
  }

  ngOnInit() {
  }

}
