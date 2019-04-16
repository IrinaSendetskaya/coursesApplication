import { Component } from "@angular/core";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

  constructor(private loginService: LoginService, private _router: Router) {}

  userInput: User = {
    login: "",
    password: ""
  };

  message: string;
  messageClass: string;

  checkUserByLoginAndPassword() {
    this.loginService
    .getUserByLoginAndPassword(this.userInput.login, this.userInput.password)
    .subscribe(user => {
      if (user) {
        this.messageClass = "alert alert-permit";
        this.message = "Вы вошли. Ваш логин: " + this.userInput.login;
        this._router.navigate(["/courses"]);
      } else {
        this.messageClass = "alert alert-danger";
        this.userInput.password = "";
      }
    });
  }

  logoutUser(){
    this.loginService.logout();
    this._router.navigate(["/login"]);
  }
}

export class User {
  login: string;
  password: string;
}
