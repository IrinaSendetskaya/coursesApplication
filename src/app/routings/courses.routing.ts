import { RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { AddCourseComponent } from "../components/add-course/add-course.component"
import { EditCourseComponent } from "../components/edit-course/edit-course.component";

export const COURSE_ROUTING: ModuleWithProviders = RouterModule.forChild([
  { path: "courses/new", component: AddCourseComponent, 
  data: { breadcrumb: 'Курсы' }},
  { path: "courses/:id", component: EditCourseComponent,
   data: { breadcrumb: 'Курсы' } }
]);
