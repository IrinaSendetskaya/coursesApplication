import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login/login.service";
import { Router } from "@angular/router";
import { User } from './login/login.component';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "coursesApplication";
  isValidate: boolean;
  userCurrentName:string="";
  constructor(private loginService: LoginService, private _router: Router) {}

  ngOnInit() {
    this.isValidate = this.loginService.isAuthorizedUser();

    if (this.isValidate) {
      const existingUser:User = JSON.parse(localStorage.getItem('user'));

      // const userSearching = existingUser.find(user => {
      //   return user.login!=null;
      // });
      this.userCurrentName=existingUser.login;
      console.log("user  "+this.userCurrentName);
      this._router.navigate(["/courses"]);
    } else {
      this._router.navigate(["/login"]);
    }
  }

  logoutUser() {
    this.loginService.logout();
    this._router.navigate(["/login"]);
  }

}
