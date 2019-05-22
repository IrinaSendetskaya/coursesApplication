import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Course } from "../models/course";
import { Observable } from "rxjs";
import { Author } from "../models/author";

@Injectable({
  providedIn: "root"
})
export class CoursesService {
  serverUrl = "http://localhost:3000/api/";

  constructor(private httpClient: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.serverUrl + "courses");
  }

  getCoursesByNameOrDate(searchInput: string): Observable<Course[]> {
    searchInput = searchInput.trim();
    const options = searchInput
      ? { params: new HttpParams().set("searchInput", searchInput) }
      : {};
    return this.httpClient.get<Course[]>(this.serverUrl + "courses", options);
  }

  getCourseById(id: string): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.serverUrl + "courses/" + id);
  }
  deleteCourse(id: number): Observable<any> {
    return this.httpClient.delete(this.serverUrl + "courses/" + id);
  }
  addNewCourses(courseInput: Course): Observable<any> {
    return this.httpClient.post(this.serverUrl + "courses", courseInput);
  }
  editCourse(courseInput: Course): Observable<any> {
    return this.httpClient.put(this.serverUrl + "courses", courseInput);
  }

  getAllAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(this.serverUrl + "authors");
  }
}
