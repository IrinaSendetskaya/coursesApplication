import { Component, OnDestroy, Input } from "@angular/core";
import { Course } from "../../models/course";
import { CoursesService } from "../../services/courses.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { AddCourse } from "src/app/store/actions/courses.action";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "add-course",
  templateUrl: "./add-course.component.html",
  styleUrls: ["./add-course.component.scss"]
})
export class AddCourseComponent implements OnDestroy {
  messageClass: string;
  message: string;
  private componetDestroyed: Subject<any> = new Subject();

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
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }

  addNewCourse() {
    this.coursesService
      .addNewCourses(this.courseInput)
      .pipe(takeUntil<any>(this.componetDestroyed))
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
}
