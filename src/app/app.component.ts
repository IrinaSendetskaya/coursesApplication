import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Subscription, Observable, Subject } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "./store/states/app.state";
import { User } from "./models/user";
import { LoadUsers } from "./store/actions/users.action";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit, OnDestroy {
  title = "coursesApplication";
  users: User[] = [];
  public coursesState$: Observable<any>;
  private componetDestroyed: Subject<any> = new Subject();

  constructor(
    private userService: UserService,
    private store$: Store<AppState>
  ) {}

  ngOnInit() {
    this.findAllUsers();
    this.coursesState$ = this.store$.select("courseState");
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }

  findAllUsers() {
    this.userService
      .getAllUsers()
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(data => {
        this.users = data;
        this.store$.dispatch(new LoadUsers(this.users));
      });
  }
}
