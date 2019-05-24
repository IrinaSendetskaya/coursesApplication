import { Component, OnInit, OnDestroy } from "@angular/core";
import { UserService } from "./services/user.service";
import { Observable, Subject } from "rxjs";
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
  private componentDestroyed: Subject<any> = new Subject();

  constructor(
    private userService: UserService,
    private store$: Store<AppState>
  ) {}

  public ngOnInit() {
    this.getUsers();
    this.coursesState$ = this.store$.select("courseState");
  }

  public ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

  public getUsers() {
    this.userService
      .getUsers()
      .pipe(takeUntil<any>(this.componentDestroyed))
      .subscribe(data => {
        this.users = data;
        this.store$.dispatch(new LoadUsers(this.users));
      });
  }
}
