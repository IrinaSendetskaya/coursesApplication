import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "./login.component";

@Injectable({
  providedIn: "root"
})
export class LoginService {
  isAuthorizedUser=function getUserInLocalStorage():boolean{
    const existingUser: User = JSON.parse(localStorage.getItem('user'));
    if (existingUser) {
      return true;  
  }else{
    return false;
  } 
}

 getUserByLoginAndPassword(
    userLogin: string,
    userPassword: string
  ): Observable<User> {
    if(userLogin === 'q' && userPassword === 'q') {
      const userEntity: User = {
        login: 'q',
        password: 'q',
      }
      localStorage.setItem("user", JSON.stringify(userEntity));
      return of(userEntity);
    } else {
      localStorage.clear();
      return of(undefined);
    }
  }

  logout(){
    localStorage.clear();
  }
}
