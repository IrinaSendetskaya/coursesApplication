import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
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
    id: 0,
    login: "",
    password: ""
  };
  message: string;
  messageClass: string;
  
  checkUserByLoginAndPassword() {
    this.loginService.getUsersByLoginAndPassword(this.userInput).subscribe(
      user => {
        if (user) {
          this.messageClass = "alert alert-permit";
          this.loginService.setUserInLocalStorage(user);
          this._router.navigate(["/courses"]);
        }
      },
      error => {
        if (error) {
          this.messageClass = "alert alert-danger";
          this.userInput.password = "";
          localStorage.clear();
        }
      }
    );
  }
}

export class User {
  id: number;
  login: string;
  password: string;
}
