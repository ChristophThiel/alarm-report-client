import { Component, OnInit, Input } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Alarm } from '../../models/alarm';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
  providers: [RestService]
})
export class GeneralComponent implements OnInit {

  @Input() alarm: string;

  public test: string = "";

  constructor(/*private _restService: RestService*/) { }

  ngOnInit(): void {
    //this.test = this._restService.testService();
  }

}
