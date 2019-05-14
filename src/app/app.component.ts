import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { User } from "./models/user";
import { Store } from '@ngrx/store';
import { AppState } from './store/states/app.state';
import { LogoutUser } from './store/actions/login.action';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "coursesApplication";
  isValidate: boolean;
  public coursesState$: Observable<{}>;
  userCurrentName: string = "";
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private _router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.coursesState$ = this.store$.select("courseState");
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
    this.store$.dispatch(new LogoutUser(this.isValidate));
    this._router.navigate(["/login"]);
  }

  changeHeaderByValidationUser() {
    this.subscription = this.userService
      .getUserInLocalStorage()
      .subscribe(isValidate => {
        this.store$.dispatch(new LogoutUser(isValidate));
        return (this.isValidate = isValidate);
      });
    if (this.isValidate) {
      this._router.navigate(["/courses"]);
    } else {
      this._router.navigate(["/login"]);
    }
  }
}
