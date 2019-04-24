import { RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { CoursesComponent } from "./courses/courses.component";
import { AuthGuard } from "./auth.guard";
import { SignupComponent } from "./signup/signup.component";
import { EditCourseComponent } from "./courses/edit-course/edit-course.component";
import { AddCourseComponent } from "./courses/add-course/add-course.component";

export const APP_ROUTING: ModuleWithProviders = RouterModule.forRoot(
  [
    { path: "login", component: LoginComponent },
    { path: "signup", component: SignupComponent },
    { path: "**", redirectTo: "courses", pathMatch: "full" },
    { path: "", redirectTo: "login", pathMatch: "full" },
    {
      path: "courses",
      component: CoursesComponent,
      canActivate: [AuthGuard],
      data: { breadcrumb: "Курсы" }
    }
  ],
  { useHash: true }
);
