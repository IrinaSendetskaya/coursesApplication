import { Action } from "@ngrx/store";
import { User } from 'src/app/models/user';

export namespace USER_ACTION {
  export const LOAD_USERS = "LOAD_USERS";
  export const ADD_USER = "ADD_USER";
}
export class LoadUsers implements Action {
  readonly type = USER_ACTION.LOAD_USERS;
  constructor(public payload: User[]) {}
}
export class AddUser implements Action {
  readonly type = USER_ACTION.ADD_USER;
  constructor(public payload: User) {}
}

export type UserActions = LoadUsers|AddUser;
