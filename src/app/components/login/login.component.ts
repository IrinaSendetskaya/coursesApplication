import { Component, OnDestroy } from "@angular/core";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { User } from "src/app/models/user";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnDestroy {
  constructor(private userService: UserService, private _router: Router) {}

  userInput: User = {
    id: 0,
    login: "",
    password: ""
  };
  message: string;
  messageClass: string;
  itemClass: string;
  private componetDestroyed: Subject<any> = new Subject();

  checkUserByLoginAndPassword() {
    this.userService
      .getUsersByLoginAndPassword(this.userInput)
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(
        user => {
          if (user) {
            this.messageClass = "alert-permit";
            this.itemClass = "border-permit";
            this.userService.setUserInLocalStorage(user);
            this._router.navigate(["/courses"]);
          }
        },
        error => {
          if (error) {
            this.messageClass = "border-danger";
            this.itemClass = "border-danger";
            this.userInput.password = "";
            localStorage.clear();
          }
        }
      );
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }
}
