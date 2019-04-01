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

  addUser() {
    console.log(this.user);
  }

  checkUser() {
    if (this.user.login === "q" && this.user.password === "q") {
      console.log(
        "Check user \nlogin: " +
          this.user.login +
          " password: " +
          this.user.password
      );
    } else {
      console.log("Check user:incorrect " + this.user);
    }
  }

  ngOnInit() {}
}

export class User {
  login: string;
  password: string;
}
