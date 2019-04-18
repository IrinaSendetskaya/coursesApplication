import { Component, OnInit } from "@angular/core";
import { Courses } from "../courses";
import { CoursesService } from "../courses.service";
import { LoginService } from "src/app/login/login.service";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { HtmlTagDefinition } from '@angular/compiler';
import { Authors } from '../courses.component';

@Component({
  selector: "add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.css"]
})
export class AddCourseComponent {
  messageClass: string;
  message: string;
  public courses: Array<Courses>;
  isValidate = this.loginService.isAuthorizedUser();
  courseInput: Courses = {
    id: 0,
    name: "",
    description: "",
    date: new Date(),
    duration: 0,
    authors: [{}]
  };
  authorsInput: Authors={
    id:0,
    name:""
  }

  constructor(
    private coursesService: CoursesService,
    private loginService: LoginService,
    private _router: Router
  ) {}

  addNewCourse() {
    if (this.isValidate) {
      this.coursesService.addNewCourses(this.courseInput).subscribe(course => {
        if (course) {
          this.messageClass = "alert alert-permit";
          console.log("inputCourse" + this.courseInput.name);
          this._router.navigate(["/courses"]);
        } else {
          this.message = "Вы ввели некорректные данные!";
          alert("Вы ввели некорректные данные!");
          this.messageClass = "alert alert-danger";
          this.courseInput.name = "";
          this.courseInput.date = new Date();
          this.courseInput.duration = 0;
          this.courseInput.description = "";
          this.courseInput.authors = [{}];
        }
      });
    } else {
      this._router.navigate(["/login"]);
    }
  }

  cancelAddNewCourse() {
    this._router.navigate(["/courses"]);
  }

  
  checkFormatDate(date: string) {
   
    // var value = date; 
    // var stringDate=this.courseInput.date.toString();
    // var rep = /[^\.\d]/;
    // if (rep.test(date)) { 
    //     value = value.replace(rep, ''); 
    //     date = value; 
    // } 

    var testText=date;
    var rep = /[^\.\d]/;
    if (rep.test(date)) 
      {
           date= testText.substring(0, testText.length - 1) 
            
          }
    
  }
}
