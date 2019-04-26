import { Component, OnInit, OnDestroy } from "@angular/core";
import { Courses } from "../courses";
import { CoursesService } from "../courses.service";
import { LoginService } from "src/app/login/login.service";
import { Router } from "@angular/router";
import { Authors } from "../courses.component";
import { Subscription } from "rxjs";

@Component({
  selector: "add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.css"]
})
export class AddCourseComponent implements OnDestroy {
  messageClass: string;
  message: string;
  addSubscription: Subscription;
  findAuthorsSubscription: Subscription;
  outputAuthors: Authors[] = [];

  courseInput: Courses = {
    id: 0,
    name: "",
    description: "",
    date: new Date(),
    duration: 0,
    authors: [{}]
  };
  authorsInput: Authors = {
    id: 0,
    name: ""
  };

  constructor(
    private coursesService: CoursesService,
    private _router: Router
  ) {}

  ngOnDestroy() {
    this.unsubscribe(this.addSubscription);
    this.unsubscribe(this.findAuthorsSubscription);
  }

  addNewCourse() {
    this.addSubscription = this.coursesService
      .addNewCourses(this.courseInput)
      .subscribe(course => {
        if (course) {
          this.messageClass = "alert alert-permit";
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
  }

  findAllAuthors() {
    this.findAuthorsSubscription = this.coursesService
      .getAllAuthors()
      .subscribe(authors => {
        return (this.outputAuthors = authors);
      });
  }

  cancelAddNewCourse() {
    this._router.navigate(["/courses"]);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }
}
