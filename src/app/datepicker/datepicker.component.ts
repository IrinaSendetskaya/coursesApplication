import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";

import * as moment from 'moment';
import { defaultFormat as _rollupMoment } from "moment";


export const MY_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD.MM.YYYY"
  }
};

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.css"],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class DatepickerComponent implements OnChanges{

  @Input() dateForParent:Date;

  date = new FormControl(moment());

ngOnChanges(changes: { [propName: string]: SimpleChange }){
if(changes['dateForParent'])console.log(changes);
}
}
