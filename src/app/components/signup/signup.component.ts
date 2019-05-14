import { Component, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { AddUser } from 'src/app/store/actions/users.action';

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnDestroy {
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

  addNewUser() {
    this.subscription = this.userService.addNewUsers(this.userInput).subscribe(
      user => {
        if (user) {
          this.store$.dispatch(new AddUser(user));
          this._router.navigate(["/login"]);
        }
      },
      error => {
        if (error) {
          this.message = "Такой пользователь уже существует!";
          this.messageClass = "message";
          this.userInput.login = "";
          this.userInput.password = "";
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
