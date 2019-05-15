import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Router } from "@angular/router";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "./store/states/app.state";
import { User } from "./models/user";
import { LoadUsers } from "./store/actions/users.action";
import { GetCurrentUser } from "./store/actions/login.action";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "coursesApplication";
  isValidate: boolean;
  users: User[] = [];
  public coursesState$: Observable<any>;
  subscription: Subscription;
  findUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private _router: Router,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.findAllUsers();
    this.coursesState$ = this.store$.select("courseState");
    this.changeHeaderByValidationUser();
  }

  ngOnDestroy() {
    this.unsubscribe(this.subscription);
    this.unsubscribe(this.findUserSubscription);
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
  findAllUsers() {
    this.findUserSubscription = this.userService
      .getAllUsers()
      .subscribe(data => {
        this.users = data["users"];
        this.store$.dispatch(new LoadUsers(this.users));
      });
  }
  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }
}
