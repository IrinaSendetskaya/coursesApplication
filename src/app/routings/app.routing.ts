import { RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { LoginComponent } from "../components/login/login.component";
import { CoursesComponent } from "../components/courses/courses.component";
import { AuthGuard } from "../services/auth.guard";
import { SignupComponent } from "../components/signup/signup.component";
import { HeaderComponent } from '../components/header/header.component';

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
