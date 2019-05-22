import { Component, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";
import { AddUser } from "src/app/store/actions/users.action";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
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
  itemClass: string;
  private componetDestroyed: Subject<any> = new Subject();

  addNewUser() {
    this.userService
      .addNewUsers(this.userInput)
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(
        user => {
          if (user) {
            this.itemClass = "border-permit";
            this.store$.dispatch(new AddUser(user));
            this._router.navigate(["/login"]);
          }
        },
        error => {
          if (error) {
            this.message = "Такой пользователь уже существует!";
            this.messageClass = "border-danger";
            this.itemClass = "border-danger";
            this.userInput.login = "";
            this.userInput.password = "";
          }
        }
      );
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }
}
