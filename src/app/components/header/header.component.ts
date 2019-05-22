import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "src/app/models/user";
import { Observable, Subject } from "rxjs";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import { AppState } from "src/app/store/states/app.state";
import { Store } from "@ngrx/store";
import { GetCurrentUser } from "src/app/store/actions/login.action";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isValidate: boolean;
  public coursesState$: Observable<any>;
  private componetDestroyed: Subject<any> = new Subject();

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
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }

  logoutUser() {
    this.userService.logout();
    this.isValidate = false;
    var user: User;
    this.store$.dispatch(new GetCurrentUser(user));
    this._router.navigate(["/login"]);
  }

  changeHeaderByValidationUser() {
    this.userService
      .getUserInLocalStorage()
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(user => {
        this.store$.dispatch(new GetCurrentUser(user));
        return (this.isValidate = !!user);
      });
  }
}
