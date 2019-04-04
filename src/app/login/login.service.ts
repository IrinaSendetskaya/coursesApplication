import { Injectable } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { User } from "./login.component";

@Injectable({
  providedIn: "root"
})

export class LoginService {
  private users: Array<User>;

  constructor() {
    this.users = [{ login: "q", password: "q" }];
  }

  validateUserByLoginAndPassword(
    userLogin: string,
    userPassword: string
  ): Observable<User[]> {
    return new Observable<User[]>(observer => {
      const userObserver = this.users.find(
        (user: User) => {
          return user.login === userLogin && user.password === userPassword;
        }
      );
      console.log("find user in service " + userObserver);
      if (userObserver === undefined) {
        observer.closed;
      } else {
        observer.next();
        observer.complete();
      }
    });
  }
}
