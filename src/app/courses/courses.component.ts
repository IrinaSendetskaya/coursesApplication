import { Component, OnInit, Input } from "@angular/core";
import { User } from "./../login/login.component";
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
  @Input()
  userName: string;

  message: string;
  public arrCourses: Array<Courses>;
  isValidate: boolean;

  constructor(
    private coursesService: CoursesService,
    private loginService: LoginService,
    private _router: Router
  ) {}

  findAllCourses() {
    this.coursesService
      .getAllCourses()
      .subscribe(data => (this.arrCourses = data["courses"]));
  }

  searchCourses(searchInput: string) {
    this.coursesService
      .getCoursesByNameOrDate(searchInput)
      .subscribe(data => (this.arrCourses = data["courses"]));
  }

  findCourseById(id: number) {
    console.log("find_id " + id);
    this.coursesService
      .getCourseById(id)
      .subscribe(data => (this.arrCourses = data["courses"]));
  }

  removeCourse(id: number) {
    console.log("delete_id " + id);
    this.coursesService.deleteCourse(id).subscribe(data => (this.arrCourses = data["courses"]));
  }

  ngOnInit() {
    this.isValidate = this.loginService.isAuthorizedUser;
    this.userName = this.loginService.returnUser.login;
    if (this.isValidate) {
      this.findAllCourses();
    } else {
      this.message = "Нет курсов";
      this._router.navigate(["/login"]);
    }
  }
}
