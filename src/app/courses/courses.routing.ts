import { RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { AddCourseComponent } from "./add-course/add-course.component";
import { EditCourseComponent } from "./edit-course/edit-course.component";
import {AuthGuard} from "../auth.guard";

export const COURSE_ROUTING: ModuleWithProviders = RouterModule.forChild([
  { path: "courses/new", component: AddCourseComponent, 
  data: { breadcrumb: 'Курсы' }},
  { path: "courses/:id", component: EditCourseComponent,
   data: { breadcrumb: 'Курсы' } }
]);
