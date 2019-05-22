import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./components/header/header.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { APP_ROUTING } from "./routings/app.routing";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { CoursesComponent } from "./components/courses/courses.component";
import { CoursesModule } from "./modules/courses.module";
import { FormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("AppComponent", () => {
  //let headerComponent: HeaderComponent;
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent,
        BreadcrumbComponent,
        LoginComponent,
        SignupComponent,
        CoursesComponent
      ],
      imports: [APP_ROUTING, CoursesModule, FormsModule],
      
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    //headerComponent = TestBed.get(HeaderComponent);
    fixture.detectChanges();
  });

  it("should create the app", () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'coursesApplication'`, () => {
    expect(app.title).toEqual("coursesApplication");
  });

  it("should render title in a h1 tag", () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to coursesApplication!"
    );
  });

});
