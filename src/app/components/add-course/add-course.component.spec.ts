import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AddCourseComponent } from "./add-course.component";
import { CoursesService } from "src/app/services/courses.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/states/app.state";

describe("AddCourseComponent", () => {
  let component: AddCourseComponent;
  let coursesService: CoursesService;
  let router: Router;
  let store: Store<AppState>;
  let fixture: ComponentFixture<AddCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseComponent],
      imports: [Router, Store],
      providers: [CoursesService]
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy;
  });
});
