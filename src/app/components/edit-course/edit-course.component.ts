import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Course } from "../../models/course";
import { Subscription } from "rxjs";
import { CoursesService } from "../../services/courses.service";
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { UpdateCourse } from 'src/app/store/actions/courses.action';

@Component({
  selector: "edit-course",
  templateUrl: "./edit-course.component.html",
  styleUrls: ["./edit-course.component.css"]
})
export class EditCourseComponent implements OnInit, OnDestroy {
  messageClass: string;
  message: string;
  editSubscription: Subscription;
  findByIdSubscription: Subscription;

  @Input()  courseInput: Course = {
    id: 0,
    name: "",
    description: "",
    date: new Date(),
    duration: 0,
    authors: [{}]
  };

  constructor(
    private coursesService: CoursesService,
    private _router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.findCourseById(
      this._router.routerState.snapshot.root.children[0].params.id
    );
  }
  ngOnDestroy() {
    this.unsubscribe(this.editSubscription);
    this.unsubscribe(this.findByIdSubscription);
  }

  findCourseById(id: string) {
    this.findByIdSubscription = this.findByIdSubscription = this.coursesService
      .getCourseById(id)
      .subscribe(data => (this.courseInput = data["courses"][0]));
  }

  editCourse() {
    this.editSubscription = this.coursesService
      .editCourse(this.courseInput)
      .subscribe(course => {
        if (course) {
          this.store$.dispatch(new UpdateCourse(course));
          this.messageClass = "alert alert-permit";
          this._router.navigate(["/courses"]);
        } else {
          this.message = "Вы ввели некорректные данные!";
          this.messageClass = "alert alert-danger";
        }
      });
  }

  showDate(date: Date) {
    this.courseInput.date = date;
  }

  cancelEditCourse() {
    this._router.navigate(["/courses"]);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }
}
