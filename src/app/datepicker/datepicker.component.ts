import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';

import * as _moment from 'moment';
import {defaultFormat as _rollupMoment} from 'moment';

const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: "LL"
  },
  display: {
    dateInput: "DD.MM.YYYY",
  }
};

@Component({
  selector: "app-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.css"],
  providers: [{provide: DateAdapter, useClass: MomentDateAdapter},
  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},]
})
export class DatepickerComponent {
  date = new FormControl(moment);
}
