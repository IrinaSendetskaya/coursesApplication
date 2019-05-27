import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EditCourseComponent } from "./edit-course.component";
import { coursesReducer } from "src/app/store/reducers/courses.reducer";
import { StoreModule } from "@ngrx/store";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DurationPipe } from "../pipes/duration.pipe";
import { CoursesService } from "src/app/services/courses.service";
import { Course } from "src/app/models/course";
import { Observable, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

describe("EditCourseComponent", () => {
  let component: EditCourseComponent;
  let coursesService: CoursesService;
  let router: Router;
  let fixture: ComponentFixture<EditCourseComponent>;

  const corsesServiceStub = {
    editCourse(course: Course): Observable<any> {
      return of([]);
    },
    getCourseById(id: number): Observable<Course[]> {
      return of([]);
    }
  };

  const routerStub = {
    routerState: {
      snapshot: { root: { firstChild: { params: { id: "test" } } } }
    }
  };
  const mockCourses: Course = {
    id: 1,
    name: "test",
    date: new Date("2019-05-21"),
    duration: 10,
    description: "test",
    authors: [{ id: 1, name: "Test" }]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCourseComponent, DurationPipe],
      imports: [
        RouterTestingModule,
        FormsModule,
        StoreModule.forRoot({ courseState: coursesReducer })
      ],
      providers: [
        { provide: CoursesService, useValue: corsesServiceStub },
        { provide: Router, useValue: routerStub }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCourseComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
    router = TestBed.get(Router);
    component.courseInput = mockCourses;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
