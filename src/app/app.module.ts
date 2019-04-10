import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CoursesComponent } from "./courses/courses.component";
import { AddCourseComponent } from "./courses/add-course/add-course.component";
import { EditCourseComponent } from "./courses/edit-course/edit-course.component";

import {AuthGuard} from "./auth.guard";
import { LoginService } from "./login/login.service";
import { APP_ROUTING } from "./app.routing";
import { CoursesService } from './courses/courses.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [BrowserModule, FormsModule, APP_ROUTING,HttpClientModule],
  providers: [LoginService, AuthGuard,CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
