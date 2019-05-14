import { Component, OnInit, OnDestroy } from "@angular/core";
import { CoursesService } from "../../services/courses.service";
import { Course } from "../../models/course";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import {
  DeleteCourse,
  LoadCourses
} from "src/app/store/actions/courses.action";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"]
})
export class CoursesComponent implements OnInit, OnDestroy {
  message: string;
  public courses: Array<Course>;
  public coursesState$: Observable<{}>;
  findSubscription: Subscription;
  searchSubscription: Subscription;
  findByIdSubscription: Subscription;
  removeSubscription: Subscription;

  constructor(
    private coursesService: CoursesService,
    private store$: Store<AppState>
  ) {}

  findAllCourses() {
    this.findSubscription = this.coursesService
      .getAllCourses()
      .subscribe(data => {
        this.courses = data["courses"];
        this.store$.dispatch(new LoadCourses(this.courses));
      });
  }

  searchCourses(searchInput: string) {
    this.searchSubscription = this.coursesService
      .getCoursesByNameOrDate(searchInput)
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
    this.findByIdSubscription = this.coursesService
      .getCourseById(id)
      .subscribe(data => {
        this.courses = data["courses"];
      });
  }

  removeCourse(id: number) {
    var responseUser = confirm("Вы действительно хотите удалить этот курс?");
    if (responseUser) {
      this.removeSubscription = this.coursesService
        .deleteCourse(id)
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
    this.unsubscribe(this.findSubscription);
    this.unsubscribe(this.searchSubscription);
    this.unsubscribe(this.findByIdSubscription);
    this.unsubscribe(this.removeSubscription);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }
}
