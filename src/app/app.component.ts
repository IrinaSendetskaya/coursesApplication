import {
  Component,
  OnInit,
  OnChanges,
  Output,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { LoginService } from "./login/login.service";
import { Router } from "@angular/router";
import { User, LoginComponent } from "./login/login.component";
import { Subscription } from 'rxjs';

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

  constructor(private loginService: LoginService, private _router: Router) {}

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
    this.loginService.logout();
    this.isValidate = false;
    this._router.navigate(["/login"]);
  }

  changeHeaderByValidationUser() {
    this.subscription=this.loginService.getUserInLocalStorage().subscribe(isValidate => {
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
