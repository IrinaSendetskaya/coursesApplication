import { Action } from "@ngrx/store";
import { User } from 'src/app/models/user';

export namespace LOGIN_ACTION {
  export const GET_CURRENT_USER = "GET_CURRENT_USER";
  //export const LOGOUT_USER = "LOGOUT_USER";
}

export class GetCurrentUser implements Action {
  readonly type = LOGIN_ACTION.GET_CURRENT_USER;
  constructor(public payload: User) {}
 }
// export class LogoutUser implements Action {
//   readonly type = LOGIN_ACTION.LOGOUT_USER;
//   constructor(public payload: User) {}
// }

export type LoginActions = GetCurrentUser ;
