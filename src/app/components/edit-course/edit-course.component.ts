import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Course } from "../../models/course";
import { Subject } from "rxjs";
import { CoursesService } from "../../services/courses.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { UpdateCourse } from "src/app/store/actions/courses.action";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "edit-course",
  templateUrl: "./edit-course.component.html",
  styleUrls: ["./edit-course.component.scss"]
})
export class EditCourseComponent implements OnInit, OnDestroy {
  messageClass: string;
  message: string;
  private componetDestroyed: Subject<any> = new Subject();

  @Input() courseInput: Course = {
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
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }

  findCourseById(id: string) {
    this.coursesService
      .getCourseById(id)
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(data => (this.courseInput = data[0]));
  }

  editCourse() {
    this.coursesService
      .editCourse(this.courseInput)
      .pipe(takeUntil<any>(this.componetDestroyed))
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
}
