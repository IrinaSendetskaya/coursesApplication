import { Component, OnInit } from "@angular/core";
import { NgModel, FormControl, ValidationErrors } from "@angular/forms";
import {LoginService} from './login.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  constructor(private userCheck:LoginService) {}
  user: User = new User();
  message: string;
  messageClass: string;

  checkUserByLoginAndPassword() {
   
    if (this.userValidator()) {
      this.messageClass = "alert alert-permit";
      this.message = "Вы вошли. Ваш логин: " + this.user.login;
    } else {
      this.messageClass = "alert alert-danger";
      this.user.password = "";
    }
  }

  userValidator():boolean{
    var isUser=this.userCheck.validateUserByLoginAndPassword(this.user.login,this.user.password).subscribe();
   
    return isUser.closed;
  }

}

export class User implements IUser{
  login: string;
  password: string;
}
interface IUser {
  login: string;
  password: string;
}
