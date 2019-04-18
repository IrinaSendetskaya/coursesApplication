import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { User } from "./login.component";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class LoginService {

  constructor(private httpClient:HttpClient){}
  users:User[];

  serverUrl="http://localhost:3000/api/";

  isAuthorizedUser=function getUserInLocalStorage():boolean{
    const existingUser: User = JSON.parse(localStorage.getItem('user'));
    if (existingUser) {
      return true;  
  }else{
    return false;
  } 
}

  addNewUsers(userInput:User): Observable<any> {
    return this.httpClient.post(this.serverUrl + "user", userInput);
  }

  getUsersByLoginAndPassword(userInput:User):Observable<User>{
    return this.httpClient.post<User>(this.serverUrl+"users",userInput);
  }

  logout(){
    localStorage.clear();
  }
}
