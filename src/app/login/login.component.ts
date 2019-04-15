import { Component } from "@angular/core";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(private userCheck: LoginService, private _router: Router) {}

  user: User = new User();
  message: string;
  messageClass: string;

  checkUserByLoginAndPassword() {
    
    if (this.userValidator()) {
      this.messageClass = "alert alert-permit";
      this.message = "Вы вошли. Ваш логин: " + this.user.login;
      this._router.navigate(["/courses"]);
    } else {
      this.messageClass = "alert alert-danger";
      this.user.password = "";
    }
  }

  userValidator(): boolean {
    var isUser = this.userCheck
      .validateUserByLoginAndPassword(this.user.login, this.user.password)
      .subscribe();
    return isUser.closed;
  }
}

export class User implements IUser {
  login: string;
  password: string;
}
interface IUser {
  login: string;
  password: string;
}
