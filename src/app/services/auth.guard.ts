import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { LogoutUser } from '../store/actions/login.action';

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  isValidate: boolean;

  constructor(private userService: UserService, private store$: Store<AppState>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userService.getUserInLocalStorage().subscribe(isValidate => {
      this.store$.dispatch(new LogoutUser(isValidate));
      return (this.isValidate = isValidate);
    });
    return this.isValidate;
  }
}
