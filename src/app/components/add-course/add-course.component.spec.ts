import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AddCourseComponent } from "./add-course.component";
import { CoursesService } from "src/app/services/courses.service";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from '@angular/router/testing';
import { DurationPipe } from "../pipes/duration.pipe";
import { FormsModule } from "@angular/forms";
import { Course } from "src/app/models/course";
import { Observable, of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from 'src/app/store/reducers/courses.reducer';

describe("AddCourseComponent", () => {
  let component: AddCourseComponent;
  let coursesService: CoursesService;
  let fixture: ComponentFixture<AddCourseComponent>;

  const corsesServiceStub = {
    addCourse(course: Course): Observable<any> {
      return of([]);
    }
  };

  const mockCourses: Course = {
    id: 1,
    name: "test",
    date: new Date("2019-05-21"),
    duration: 0,
    description: "test",
    authors: [{ id: 1, name: "Test" }]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddCourseComponent, DurationPipe],
      imports: [RouterTestingModule, FormsModule, StoreModule.forRoot({courseState:coursesReducer})],
      providers: [{ provide: CoursesService, useValue: corsesServiceStub }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy;
  });
});
