import { Component, OnInit } from "@angular/core";
import { NgModel } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor() {}
  user: User = new User();
  message: string;
  messageClass: string;

  addUser() {
    console.log(this.user);
  }

  checkUser() {
    
    if (this.user.login === "q" && this.user.password === "q") {
      this.messageClass = "alert alert-permit";
      this.message = "Вы вошли. Ваш логин: " + this.user.login;
    } else {
      this.messageClass = "alert alert-danger";
      this.user.password = "";
    }
  }

  ngOnInit() {}
}

export class User {
  login: string;
  password: string;
}
