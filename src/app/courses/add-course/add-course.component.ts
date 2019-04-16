import { Component, OnInit } from "@angular/core";
import { Courses } from "../courses";
import { CoursesService } from "../courses.service";
import { LoginService } from "src/app/login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.css"]
})
export class AddCourseComponent {
  messageClass: string;
  message: string;
  public courses: Array<Courses>;
  courseInput: Courses = {
    id: 0,
    name: "",
    description: "",
    date: new Date(),
    duration: 0,
    authors: [{}]
  };

  constructor(
    private coursesService: CoursesService,
    private loginService: LoginService,
    private _router: Router
  ) {}

  addNewCourse() {
    if (this.loginService.isAuthorizedUser()) {
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

  cancelAddNewCourse(){
    this._router.navigate(["/courses"]);
  }
}
