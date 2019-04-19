import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CoursesModule } from "./courses/courses.module";
import {BreadcrumbsModule} from "ng6-breadcrumbs";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CoursesComponent } from "./courses/courses.component";
import { SignupComponent } from './signup/signup.component';

import { AuthGuard } from "./auth.guard";
import { LoginService } from "./login/login.service";
import { APP_ROUTING } from "./app.routing";
import { CoursesService } from "./courses/courses.service";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';


@NgModule({
  declarations: [AppComponent, LoginComponent, CoursesComponent, SignupComponent, BreadcrumbComponent],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    CoursesModule,
    HttpClientModule,
    BreadcrumbsModule
  ],
  providers: [LoginService, AuthGuard, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
