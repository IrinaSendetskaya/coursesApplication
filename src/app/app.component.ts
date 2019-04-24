import { Component, OnInit, OnChanges, Input, Output, OnDestroy } from "@angular/core";
import { LoginService } from "./login/login.service";
import { Router } from "@angular/router";
import { User } from './login/login.component';
import { CoursesModule } from './courses/courses.module';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "coursesApplication";
  @Input() isValidate: boolean;
  userCurrentName:string="";
  constructor(private loginService: LoginService, private _router: Router) {}

  ngOnInit() {
    this.changeHeaderByValidationUser();
    //console.log("init validate "+this.loginService.isAuthorizedUser());
  }

  // ngOnChanges(){
  //   console.log("changes validate "+this.loginService.isAuthorizedUser());
    
  // }

  // ngOnDestroy(){
  //   console.log("destroy validate "+this.loginService.isAuthorizedUser());
  // }

  // ngAfterViewChecked(){
  //   console.log("afterviewchecked validate "+this.loginService.isAuthorizedUser());
  // }

  // ngAfterViewInit(){
  //   console.log("afterviewinit validate "+this.loginService.isAuthorizedUser());
  // }

  // ngAfterContentInit(){
  //   console.log("aftercontentinit validate "+this.loginService.isAuthorizedUser());
  // }
  // ngAfterContentChecked(){
  //   console.log("afterContentChecked validate "+this.loginService.isAuthorizedUser());
  // }
  // ngDoCheck(){
  //   //this.changeHeaderByValidationUser();
  //   console.log("DoCheck validate "+this.loginService.isAuthorizedUser());
  // }

  logoutUser() {
    this.loginService.logout();
    this._router.navigate(["/login"]);
  }

  changeHeaderByValidationUser(){
    this.isValidate = this.loginService.isAuthorizedUser();

    if (this.isValidate) {
      const existingUser:User = JSON.parse(localStorage.getItem('user'));
      this.userCurrentName=existingUser.login;
      this._router.navigate(["/courses"]);
    } else {
      this._router.navigate(["/login"]);
    }
  }

}
