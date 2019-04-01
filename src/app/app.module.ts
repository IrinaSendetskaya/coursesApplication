import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { EditCourseComponent } from './edit-course/edit-course.component';

const appRoutes: Routes =[
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'courses', component: CoursesComponent},
  { path: 'courses/new', component: AddCourseComponent },
  { path: 'courses/:id', component: EditCourseComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoursesComponent,
    AddCourseComponent,
    EditCourseComponent
  ],
  imports: [
    BrowserModule, FormsModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
