import { TestBed, async } from "@angular/core/testing";
import { CoursesService } from "./courses.service";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from "@angular/common/http/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Course } from "../models/course";
import { Author } from "../models/author";
import { HttpErrorResponse } from '@angular/common/http';

describe("CoursesService", () => {
  let mockHttp: HttpTestingController;
  let coursesService: CoursesService;
  const mockResponse: Course[] = [
    {
      id: 1,
      name: "test",
      date: new Date("2019-05-21"),
      duration: 0,
      description: "test",
      authors: [{ id: 1, name: "Test" }]
    }
  ];
  const mockCourse: Course = {
    id: 1,
    name: "test",
    date: new Date("2019-05-21"),
    duration: 0,
    description: "test",
    authors: [{ id: 1, name: "Test" }]
  };

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CoursesService]
    })));

  beforeEach(() => {
    mockHttp = TestBed.get(HttpTestingController);
    coursesService = TestBed.get(CoursesService);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it("should be created", () => {
    expect(coursesService).toBeTruthy();
  });

  it("should get Courses", async(() => {
    coursesService.getCourses().subscribe(courses => {
      expect(courses).toEqual(mockResponse);
    });

    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses"
    );
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual("json");
    expect(mockRequest.request.method).toEqual("GET");
    mockRequest.flush(mockResponse);
  }));

  it("should get Course by name", async(() => {
    coursesService.getCoursesByName("test").subscribe(course => {
      expect(course).toEqual(mockResponse);
    });
    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses?searchInput=test"
    );
    mockRequest.flush(mockResponse);
  }));

  it("should get Course by name (without parameters)", async(() => {
    coursesService.getCoursesByName("").subscribe(course => {
      expect(course).toEqual(mockResponse);
    });
    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses"
    );
    mockRequest.flush(mockResponse);
  }));

  it("should not get Course by name (error)", async(() => {
    const emsg = 'deliberate 404 error';
    spyOn(coursesService, 'getCoursesByName').and.callThrough();
    coursesService.getCoursesByName("rest").subscribe(course => {
      fail('should have failed with the 404 error'),
        (error: HttpErrorResponse) => {
          expect(coursesService.getCoursesByName("rest")).toHaveBeenCalled();
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
    });
    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses?searchInput=rest"
    );
    mockRequest.flush(emsg, { status: 404, statusText: 'Not Found' });;
  }));

  it("should get Course by id", async(() => {
    coursesService.getCourseById(1).subscribe(course => {
      expect(course).toEqual(mockResponse);
    });
    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses/1"
    );
    mockRequest.flush(mockResponse);
  }));

  it("should add Course", async(() => {
    coursesService.addCourse(mockCourse).subscribe(course => {
      expect(course).toEqual(mockResponse);
    });
    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses"
    );
    expect(mockRequest.request.method).toEqual("POST");
    mockRequest.flush(mockResponse);
  }));

  it("should delete Course", async(() => {
    coursesService.deleteCourse(1).subscribe(course => {
      expect(course).toEqual(mockResponse);
    });
    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses/1"
    );
    expect(mockRequest.request.method).toEqual("DELETE");
    mockRequest.flush(mockResponse);
  }));

  it("should edit Course", async(() => {
    coursesService.editCourse(mockCourse).subscribe(course => {
      expect(course).toEqual(mockResponse);
    });
    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "courses"
    );
    expect(mockRequest.request.method).toEqual("PUT");
    mockRequest.flush(mockResponse);
  }));
});

describe("CoursesService", () => {
  let mockHttp: HttpTestingController;
  let coursesService: CoursesService;
  const mockAuthors: Author[] = [{ id: 1, name: "Test" }];

  beforeEach(async(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [CoursesService]
    })));

  beforeEach(() => {
    mockHttp = TestBed.get(HttpTestingController);
    coursesService = TestBed.get(CoursesService);
  });

  afterEach(() => {
    mockHttp.verify();
  });

  it("should get Authors", async(() => {
    coursesService.getAuthors().subscribe(authors => {
      expect(authors).toEqual(mockAuthors);
      return authors;
    });

    const mockRequest: TestRequest = mockHttp.expectOne(
      coursesService.serverUrl + "authors"
    );
    expect(mockRequest.cancelled).toBeFalsy();
    expect(mockRequest.request.responseType).toEqual("json");
    expect(mockRequest.request.method).toEqual("GET");
    mockRequest.flush(mockAuthors);
  }));
});
