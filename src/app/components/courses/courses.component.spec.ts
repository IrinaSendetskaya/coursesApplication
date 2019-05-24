import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CoursesComponent } from "./courses.component";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CoursesService } from "src/app/services/courses.service";
import { Observable, of, throwError } from "rxjs";
import { Course } from "src/app/models/course";
import { DurationPipe } from "../pipes/duration.pipe";
import { StoreModule } from "@ngrx/store";
import { coursesReducer } from "src/app/store/reducers/courses.reducer";

describe("CoursesComponent", () => {
  let component: CoursesComponent;
  let courseService: Partial<CoursesService>;
  let fixture: ComponentFixture<CoursesComponent>;

  const corsesServiceStub = {
    getCourses(): Observable<Course[]> {
      return of([]);
    },
    getCoursesByName(searchInput: string): Observable<Course[]> {
      return of([]);
    },
    getCourseById(id: number): Observable<Course[]> {
      return of([]);
    },
    deleteCourse(id: number): Observable<any> {
      return of([]);
    }
  };
  
  const mockCourses: Course[] = [
    {
      id: 1,
      name: "test",
      date: new Date("2019-05-21"),
      duration: 0,
      description: "test",
      authors: [{ id: 1, name: "Test" }]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent, DurationPipe],
      imports: [StoreModule.forRoot({ courseState: coursesReducer })],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: CoursesService, useValue: corsesServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CoursesService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call getCourses and return value", async(() => {
    spyOn(courseService, "getCourses").and.returnValue(of(mockCourses));
    component.getCourses();
    fixture.detectChanges();
    expect(component.courses).toEqual(mockCourses);
  }));

  it("should call searchCourses and return value", async(() => {
    spyOn(courseService, "getCoursesByName").and.returnValue(of(mockCourses));
    component.searchCourses("test");
    fixture.detectChanges();
    expect(component.courses).toEqual(mockCourses);
  }));

  it("should call searchCourses and not return value", async(() => {
    spyOn(courseService, "getCoursesByName").and.callFake(()=>{
      return throwError(new Error("По Вашему запросу ничего не найдено"));
    });
    component.searchCourses("rest");
    fixture.detectChanges();
    expect(component.message).toEqual("По Вашему запросу ничего не найдено");
  }));

  it("should call getCourseById and return value", async(() => {
    spyOn(courseService, "getCourseById").and.returnValue(of(mockCourses));
    component.getCourseById(1);
    fixture.detectChanges();
    expect(component.courses).toEqual(mockCourses);
  }));

  it("should call removeCourse and not return this value", async(() => {
    spyOn(courseService, "deleteCourse").and.returnValue(of(undefined));
    component.removeCourse(1);
    fixture.detectChanges();
    expect(component.courses).toBeUndefined();
  }));
});
