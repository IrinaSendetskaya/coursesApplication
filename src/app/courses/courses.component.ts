import { Component, OnInit, Input } from "@angular/core";
import { CoursesService } from "./courses.service";
import { Courses } from "./courses";
import { LoginService } from "../login/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"]
})
export class CoursesComponent implements OnInit {
  message: string;
  public courses: Array<Courses>;

  constructor(
    private coursesService: CoursesService,
    private loginService: LoginService,
    private _router: Router
  ) {}

  findAllCourses() {
    this.coursesService
      .getAllCourses()
      .subscribe(data => (this.courses = data["courses"]));
  }

  searchCourses(searchInput: string) {
    this.coursesService
      .getCoursesByNameOrDate(searchInput)
      .subscribe(data => (this.courses = data["courses"]));
  }

  findCourseById(id: number) {
    this.coursesService
      .getCourseById(id)
      .subscribe(data => (this.courses = data["courses"]));
  }

  removeCourse(id: number) {
    var responseUser = confirm("Вы действительно хотите удалить этот курс?");
    if (responseUser) {
      this.coursesService
        .deleteCourse(id)
        .subscribe(data => (this.courses = data["courses"]));
    }
  }

  ngOnInit() {
    this.findAllCourses();
  }
}

export class Authors {
  id: number;
  name: string;
}
