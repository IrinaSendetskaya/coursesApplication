import { Component, OnDestroy, Input } from "@angular/core";
import { Course } from "../../models/course";
import { CoursesService } from "../../services/courses.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { AddCourse } from "src/app/store/actions/courses.action";

@Component({
  selector: "add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.css"]
})
export class AddCourseComponent implements OnDestroy {
  messageClass: string;
  message: string;
  addSubscription: Subscription;

  initCourse(): Course {
    return {
      id: 0,
      name: "",
      description: "",
      date: new Date(),
      duration: 0,
      authors: [{}]
    };
  }

 @Input() courseInput: Course = this.initCourse();

  constructor(
    private coursesService: CoursesService,
    private _router: Router,
    private store: Store<AppState>
  ) {}

  ngOnDestroy() {
    this.unsubscribe(this.addSubscription);
  }

  addNewCourse() {
    this.addSubscription = this.coursesService
      .addNewCourses(this.courseInput)
      .subscribe(course => {
        if (course) {
          this.store.dispatch(new AddCourse(course));
          this.messageClass = "alert alert-permit";
          this._router.navigate(["/courses"]);
        } else {
          this.message = "Вы ввели некорректные данные!";
          this.messageClass = "alert alert-danger";
          this.initCourse();
        }
      });
  }

  showDate(date: Date) {
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
