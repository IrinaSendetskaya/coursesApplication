import { Action } from "@ngrx/store";
import { User } from 'src/app/models/user';

export namespace LOGIN_ACTION {
  export const LOGIN_USER = "LOGIN_USER";
  export const LOGOUT_USER = "LOGOUT_USER";
}

export class LoginUser implements Action {
  readonly type = LOGIN_ACTION.LOGIN_USER;
  constructor(public payload: User) {}
}
export class LogoutUser implements Action {
  readonly type = LOGIN_ACTION.LOGOUT_USER;
  constructor(public payload: boolean) {}
}

export type LoginActions = LoginUser|LogoutUser ;
