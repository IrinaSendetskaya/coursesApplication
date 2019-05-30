import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { Store } from "@ngrx/store";
import { AppState } from "../store/states/app.state";
import { GetCurrentUser } from "../store/actions/login.action";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  isAuthentificated: boolean;

  constructor(
    private userService: UserService,
    private store$: Store<AppState>
  ) {}

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.getUserInLocalStorage().subscribe(currentUser => {
      this.store$.dispatch(new GetCurrentUser(currentUser));
      this.isAuthentificated = currentUser ? true : false;
    });
    return this.isAuthentificated;
  }
}
