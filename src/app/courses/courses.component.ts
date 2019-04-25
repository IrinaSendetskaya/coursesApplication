import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { CoursesService } from "./courses.service";
import { Courses } from "./courses";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"]
})
export class CoursesComponent implements OnInit,OnDestroy {
  message: string;
  public courses: Array<Courses>;
  findSubscription: Subscription;
  searchSubscription: Subscription;
  findByIdSubscription: Subscription;
  removeSubscription: Subscription;

  constructor(
    private coursesService: CoursesService
  ) {}

  findAllCourses() {
    this.findSubscription=this.coursesService
      .getAllCourses()
      .subscribe(data => (this.courses = data["courses"]));
  }

  searchCourses(searchInput: string) {
    this.searchSubscription=this.coursesService
      .getCoursesByNameOrDate(searchInput)
      .subscribe(data => (this.courses = data["courses"]));
  }

  findCourseById(id: number) {
    this.findByIdSubscription=this.coursesService
      .getCourseById(id)
      .subscribe(data => (this.courses = data["courses"]));
  }

  removeCourse(id: number) {
    var responseUser = confirm("Вы действительно хотите удалить этот курс?");
    if (responseUser) {
      this.removeSubscription=this.coursesService
        .deleteCourse(id)
        .subscribe(data => (this.courses = data["courses"]));
    }
  }

  ngOnInit() {
    this.findAllCourses();
  }

  ngOnDestroy() {
    this.unsubscribe(this.findSubscription); 
    this.unsubscribe(this.searchSubscription);
    this.unsubscribe(this.findByIdSubscription);
    this.unsubscribe(this.removeSubscription);
  }

  unsubscribe(subscription:Subscription){
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }
}

export class Authors {
  id: number;
  name: string;
}
