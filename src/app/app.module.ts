import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CoursesModule } from "./modules/courses.module";
import { BreadcrumbsModule } from "ng6-breadcrumbs";
import { MatNativeDateModule } from "@angular/material";
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { SignupComponent } from "./components/signup/signup.component";

import { AuthGuard } from "./services/auth.guard";
import { UserService } from "./services/user.service";
import { APP_ROUTING } from "./routings/app.routing";
import { CoursesService } from "./services/courses.service";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent,
    SignupComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    CoursesModule,
    HttpClientModule,
    BreadcrumbsModule,
    MatNativeDateModule,
    MatMomentDateModule
  ],
  providers: [UserService, AuthGuard, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
