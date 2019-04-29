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
  MatNativeDateModule,
  MatCardModule
} from "@angular/material";
import { DragDropModule } from '@angular/cdk/drag-drop';


import { AppComponent } from "../app.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import { DatepickerComponent } from "../datepicker/datepicker.component";
import { DragDropComponent } from '../drag-drop/drag-drop.component';

import { AuthGuard } from "../auth.guard";
import { COURSE_ROUTING } from "./courses.routing";
import { CoursesService } from "./courses.service";
import { DurationPipe } from "../shared/duration.pipe";

@NgModule({
  declarations: [
    AddCourseComponent,
    EditCourseComponent,
    DurationPipe,
    DatepickerComponent,
    DragDropComponent
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
    MatInputModule,
    DragDropModule,
    MatCardModule
  ],
  providers: [AuthGuard, CoursesService],
  bootstrap: [AppComponent],
  exports: [
    DurationPipe,
    DatepickerComponent,
    DragDropComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatInputModule,
    DragDropModule,
    MatCardModule
  ]
})
export class CoursesModule {}
