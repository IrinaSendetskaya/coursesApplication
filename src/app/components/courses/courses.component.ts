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

  findAllCourses() {
    this.coursesService
      .getAllCourses()
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(data => {
        this.courses = data["courses"];
        this.store$.dispatch(new LoadCourses(this.courses));
      });
  }

  searchCourses(searchInput: string) {
    this.coursesService
      .getCoursesByNameOrDate(searchInput)
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(
        data => (this.courses = data["courses"]),
        error => {
          if (error) {
            this.courses = [];
            this.message = "По Вашему запросу ничего не найдено";
          }
        }
      );
  }

  findCourseById(id: string) {
    this.coursesService
      .getCourseById(id)
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(data => {
        this.courses = data["courses"];
      });
  }

  removeCourse(id: number) {
    var responseUser = confirm("Вы действительно хотите удалить этот курс?");
    if (responseUser) {
      this.coursesService
        .deleteCourse(id)
        .pipe(takeUntil<any>(this.componetDestroyed))
        .subscribe(data => {
          this.store$.dispatch(new DeleteCourse(id));
          this.courses = data["courses"];
        });
    }
  }

  ngOnInit() {
    this.findAllCourses();
    this.coursesState$ = this.store$.select("courseState");
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }
}
