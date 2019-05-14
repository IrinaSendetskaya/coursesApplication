import { Component, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "src/app/models/user";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { LoginUser } from "src/app/store/actions/login.action";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnDestroy {
  constructor(
    private userService: UserService,
    private _router: Router,
    private store$: Store<AppState>
  ) {}

  userInput: User = {
    id: 0,
    login: "",
    password: ""
  };
  message: string;
  messageClass: string;
  subscription: Subscription;

  checkUserByLoginAndPassword() {
    this.subscription = this.userService
      .getUsersByLoginAndPassword(this.userInput)
      .subscribe(
        user => {
          if (user) {
            this.messageClass = "alert alert-permit";
            this.userService.setUserInLocalStorage(user);
            this.store$.dispatch(new LoginUser(user));
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
