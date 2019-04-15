import { Component, OnInit } from '@angular/core';
import { Courses } from '../courses';
import { CoursesService } from '../courses.service';
import { LoginService } from 'src/app/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  messageClass: string;
  message: string;
  public arrCourses: Array<Courses>;
  public course:Courses;
  isValidate: boolean;

  constructor(
    private coursesService: CoursesService,
    private loginService: LoginService,
    private _router: Router
  ) {}

  addNewCourse() {
    this.coursesService
      .addNewCourses()
      .subscribe(data => (this.arrCourses = data["courses"]));
  }
  
}
