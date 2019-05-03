import { Component,OnDestroy } from "@angular/core";
import { Course } from "../../models/course";
import { CoursesService } from "../../services/courses.service";
import { Router } from "@angular/router";
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

  courseInput: Course = {
    id: 0,
    name: "",
    description: "",
    date:new Date(),
    duration: 0,
    authors: [{}]
  };

  constructor(
    private coursesService: CoursesService,
    private _router: Router
  ) {}

  ngOnDestroy() {
    this.unsubscribe(this.addSubscription);
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

  showDate(date:Date){
    this.courseInput.date = date;
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
