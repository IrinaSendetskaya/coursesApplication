import { Injectable } from "@angular/core";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { User } from "./login.component";
import { HttpClient, HttpParams } from "@angular/common/http";
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}
  users: User[];
  private subject = new BehaviorSubject<any>(undefined);

  serverUrl = "http://localhost:3000/api/";

  setUserValidationState(validateUser: boolean): void {
    this.subject.next(validateUser);
  }

  getUserInLocalStorage(): Observable<boolean> {
    const existingUser: User = JSON.parse(localStorage.getItem("user"));
    this.setUserValidationState(!!existingUser);
    return this.subject.asObservable().pipe(share());
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  addNewUsers(userInput: User): Observable<any> {
    return this.httpClient.post(this.serverUrl + "user", userInput);
  }

  getUsersByLoginAndPassword(userInput: User): Observable<User> {
    return this.httpClient.post<User>(this.serverUrl + "users", userInput);
  }

  logout() {
    localStorage.clear();
  }
}
