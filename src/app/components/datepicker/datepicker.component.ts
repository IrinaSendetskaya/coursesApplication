import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  OnDestroy
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MomentDateAdapter } from "@angular/material-moment-adapter";
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material/core";

import * as moment from "moment";
import { defaultFormat as _rollupMoment } from "moment";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

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
  styleUrls: ["./datepicker.component.scss"],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DatepickerComponent implements OnChanges, OnDestroy {
  @Input() dateForParent: Date;
  @Output() dateOut: EventEmitter<Date> = new EventEmitter<Date>();
  private componetDestroyed: Subject<any> = new Subject();

  date = new FormControl(moment(), Validators.required);

  ngOnChanges() {
    this.date.valueChanges
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(data => {
        this.dateForParent = data;
        this.dateOut.emit(this.dateForParent);
      });
  }
  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }
}
