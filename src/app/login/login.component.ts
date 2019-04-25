import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy } from "@angular/core";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnDestroy{
  
  constructor(private loginService: LoginService, private _router: Router) {}

  userInput: User = {
    id: 0,
    login: "",
    password: ""
  };
  message: string;
  messageClass: string;
  subscription: Subscription;
  
  checkUserByLoginAndPassword() {
    this.subscription=this.loginService.getUsersByLoginAndPassword(this.userInput).subscribe(
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}

export class User {
  id: number;
  login: string;
  password: string;
}
