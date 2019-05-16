import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Subscription, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "./store/states/app.state";
import { User } from "./models/user";
import { LoadUsers } from "./store/actions/users.action";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "coursesApplication";
  users: User[] = [];
  public coursesState$: Observable<any>;
  findUserSubscription: Subscription;

  constructor(
    private userService: UserService,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.findAllUsers();
    this.coursesState$ = this.store$.select("courseState");
  }

  ngOnDestroy() {
    this.unsubscribe(this.findUserSubscription);
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
