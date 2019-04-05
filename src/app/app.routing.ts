import { RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { CoursesComponent } from "./courses/courses.component";
import { AddCourseComponent } from "./courses/add-course/add-course.component";
import { EditCourseComponent } from "./courses/edit-course/edit-course.component";
import {AuthGuard} from "./auth.guard";

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot([
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "courses", component: CoursesComponent, canActivate:[AuthGuard] },
  { path: "courses/new", component: AddCourseComponent },
  { path: "courses/:id", component: EditCourseComponent }
], {useHash:true});
