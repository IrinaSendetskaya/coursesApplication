import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CoursesModule } from "../app/courses/courses.module";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { CoursesComponent } from "./courses/courses.component";

import { AuthGuard } from "./auth.guard";
import { LoginService } from "./login/login.service";
import { APP_ROUTING } from "./app.routing";
import { CoursesService } from "./courses/courses.service";
import { DurationPipe } from './shared/duration.pipe';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent, LoginComponent, CoursesComponent, DurationPipe],
  imports: [
    BrowserModule,
    FormsModule,
    APP_ROUTING,
    CoursesModule,
    HttpClientModule
  ],
  providers: [LoginService, AuthGuard, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
