import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./login.component";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  returnUser = {login:"",password:""};
  private users = new Array();
  isAuthorizedUser:boolean=false;

  constructor() {
    this.returnUser = JSON.parse(localStorage.getItem("user"));
    this.users.push(this.returnUser);
  }

  validateUserByLoginAndPassword(
    userLogin: string,
    userPassword: string
  ): Observable<User[]> {
    return new Observable<User[]>(observer => {

      const userObserver = this.users.find(user => {
        return (
          this.returnUser.login === userLogin &&
          this.returnUser.password === userPassword
        );
      });console.log(userObserver); console.log(this.returnUser);
      if (userObserver === undefined) {
        this.isAuthorizedUser=false;
        observer.closed;
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({ login: userLogin, password: userPassword })
        );
        this.isAuthorizedUser=true;
        observer.next();
        observer.complete();
      } 
    });
  }
}
