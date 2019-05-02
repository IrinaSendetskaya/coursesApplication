import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "./models/user";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "coursesApplication";
  isValidate: boolean;
  userCurrentName: string = "";
  subscription: Subscription;

  constructor(private userService: UserService, private _router: Router) {}

  ngOnInit() {
    this.changeHeaderByValidationUser();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  logoutUser() {
    this.userService.logout();
    this.isValidate = false;
    this._router.navigate(["/login"]);
  }

  changeHeaderByValidationUser() {
    this.subscription = this.userService
      .getUserInLocalStorage()
      .subscribe(isValidate => {
        return (this.isValidate = isValidate);
      });

    if (this.isValidate) {
      const existingUser: User = JSON.parse(localStorage.getItem("user"));
      this.userCurrentName = existingUser.login;
      this._router.navigate(["/courses"]);
    } else {
      this._router.navigate(["/login"]);
    }
  }
}
