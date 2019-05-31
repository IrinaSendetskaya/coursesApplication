import { TestBed, async } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { AuthGuard } from "./auth.guard";
import { StoreModule } from "@ngrx/store";
import { coursesReducer } from "../store/reducers/courses.reducer";
import { of, Observable } from "rxjs";
import { User } from "../models/user";
import { UserService } from "./user.service";

describe("AuthGuard", () => {
  let authService: AuthGuard;
  let userService: UserService;
  const userServiceStub = {
    getUserInLocalStorage(): Observable<User> {
      return of();
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot({ courseState: coursesReducer })
      ],
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userServiceStub }
      ]
    });
  }));

  beforeEach(() => {
    authService = TestBed.get(AuthGuard);
    userService = TestBed.get(UserService);
  });

  it("should be created", () => {
    expect(authService).toBeTruthy();
  });

  it("can activate if user logged", () => {
    const mockUser: User = { login: "user", password: "user" };
    spyOn(userService, "getUserInLocalStorage").and.returnValue(of(mockUser));
    authService.canActivate(null, null);
    expect(authService.isAuthentificated).toBeTruthy();
  });

  it("can not authentificate if user doesn't logged", () => {
    const response: User[] = undefined;
    spyOn(userService, "getUserInLocalStorage").and.returnValue(of(response));
    authService.canActivate(null, null);
    expect(authService.isAuthentificated).toBeFalsy();
  });
});
