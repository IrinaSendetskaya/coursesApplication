import { TestBed, async, ComponentFixture } from "@angular/core/testing";

import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { CoursesModule } from "./modules/courses.module";
import { FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of, Observable } from "rxjs";

import { User } from "./models/user";
import { AppComponent } from "./app.component";
import { APP_ROUTING } from "./routings/app.routing";
import { UserService } from "./services/user.service";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let service: UserService;

  const userServiceStub = {
    getUsers(): Observable<User[]> {
      return of([]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        CoursesComponent
      ],
      imports: [APP_ROUTING, CoursesModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: UserService, useValue: userServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges();
  });

  it("should create the component", () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'coursesApplication'`, () => {
    expect(component.title).toEqual("coursesApplication");
  });

  it("should render title in a h1 tag", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to coursesApplication!"
    );
  });

  it("should call getUsers and return list of users", async(() => {
    const mockUsers: User[] = [{ login: "user", password: "user" }];
    spyOn(service, "getUsers").and.returnValue(of(mockUsers));
    component.getUsers();
    fixture.detectChanges();
    expect(component.users).toEqual(mockUsers);
  }));
});
