import { Action } from "@ngrx/store";
import { User } from 'src/app/models/user';

export namespace USER_ACTION {
  export const ADD_USER = "ADD_USER";
}

export class AddUser implements Action {
  readonly type = USER_ACTION.ADD_USER;
  constructor(public payload: User) {}
}

export type UserActions = AddUser;
