import { Component, OnInit, OnDestroy } from "@angular/core";
import { CoursesService } from "../../services/courses.service";
import { Course } from "../../models/course";
import { Observable, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import {
  DeleteCourse,
  LoadCourses
} from "src/app/store/actions/courses.action";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"]
})
export class CoursesComponent implements OnInit, OnDestroy {
  message: string;
  public courses: Array<Course>;
  public coursesState$: Observable<any>;
  private componetDestroyed: Subject<any> = new Subject();

  constructor(
    private coursesService: CoursesService,
    private store$: Store<AppState>
  ) {}

  public getCourses() {
    this.coursesService
      .getCourses()
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(data => {
        this.courses = data;
        this.store$.dispatch(new LoadCourses(this.courses));
      });
  }

  public searchCourses(searchInput: string) {
    this.coursesService
      .getCoursesByName(searchInput)
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(
        data => (this.courses = data),
        error => {
          if (error) {
            this.courses = [];
            this.message = "По Вашему запросу ничего не найдено";
          }
        }
      );
  }

  public getCourseById(id: number) {
    this.coursesService
      .getCourseById(id)
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(data => {
        this.courses = data;
      });
  }

  public removeCourse(id: number) {
    var responseUser = confirm("Вы действительно хотите удалить этот курс?");
    if (responseUser) {
      this.coursesService
        .deleteCourse(id)
        .pipe(takeUntil<any>(this.componetDestroyed))
        .subscribe(data => {
          this.store$.dispatch(new DeleteCourse(id));
          this.courses = data;
        });
    }
  }

 public ngOnInit() {
    this.getCourses();
    this.coursesState$ = this.store$.select("courseState");
  }

 public ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }
}
