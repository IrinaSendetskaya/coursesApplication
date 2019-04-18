import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "../app.component";
import { AddCourseComponent } from "./add-course/add-course.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";

import { AuthGuard } from "../auth.guard";
import { COURSE_ROUTING } from "./courses.routing";
import { CoursesService } from "./courses.service";
import { DurationPipe } from "../shared/duration.pipe";

@NgModule({
  declarations: [AddCourseComponent, EditCourseComponent, DurationPipe],
  imports: [CommonModule, FormsModule, COURSE_ROUTING, HttpClientModule],
  providers: [AuthGuard, CoursesService],
  bootstrap: [AppComponent],
  exports: [DurationPipe]
})
export class CoursesModule {}
