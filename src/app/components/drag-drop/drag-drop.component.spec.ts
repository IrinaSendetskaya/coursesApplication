import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DragDropComponent } from "./drag-drop.component";
import { CoursesService } from "src/app/services/courses.service";
import { Observable, of } from "rxjs";
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";

describe("DragDropComponent", () => {
  let component: DragDropComponent;
  let coursesService: CoursesService;
  let fixture: ComponentFixture<DragDropComponent>;

  const corsesServiceStub = {
    getAuthors(): Observable<any> {
      return of([]);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DragDropComponent],
      imports: [DragDropModule],
      providers: [{ provide: CoursesService, useValue: corsesServiceStub }],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropComponent);
    component = fixture.componentInstance;
    coursesService = TestBed.get(CoursesService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
