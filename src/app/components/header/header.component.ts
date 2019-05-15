import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "src/app/models/user";
import { Observable, Subscription } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/store/states/app.state";
import { Store } from "@ngrx/store";
import { GetCurrentUser } from "src/app/store/actions/login.action";
import { LoadUsers } from "src/app/store/actions/users.action";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isValidate: boolean;
  public coursesState$: Observable<any>;
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
    this.unsubscribe(this.subscription);
  }

  logoutUser() {
    this.userService.logout();
    this.isValidate = false;
    var user: User;
    this.store$.dispatch(new GetCurrentUser(user));
    this._router.navigate(["/login"]);
  }

  changeHeaderByValidationUser() {
    this.subscription = this.userService
      .getUserInLocalStorage()
      .subscribe(user => {
        this.store$.dispatch(new GetCurrentUser(user));
        return (this.isValidate = !!user);
      });
  }
  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }
}
