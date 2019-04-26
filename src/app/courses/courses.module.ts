import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import {
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule
} from "@angular/material";

import { AppComponent } from "../app.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { DatepickerComponent } from "../datepicker/datepicker.component";

import { AuthGuard } from "../auth.guard";
import { COURSE_ROUTING } from "./courses.routing";
import { CoursesService } from "./courses.service";
import { DurationPipe } from "../shared/duration.pipe";

@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    DurationPipe,
    DatepickerComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    COURSE_ROUTING,
    HttpClientModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [AuthGuard, CoursesService],
  bootstrap: [AppComponent],
  exports: [
    DurationPipe,
    DatepickerComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatInputModule
  ]
})
export class CoursesModule {}
