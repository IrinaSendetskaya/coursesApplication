import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpParams
} from "@angular/common/http";
import { Courses } from "./courses";
import { Observable } from "rxjs";
import { Authors } from './courses.component';

@Injectable({
  providedIn: "root"
})
export class CoursesService {
  serverUrl = "http://localhost:3000/api/";

  constructor(private httpClient: HttpClient) {}

  getAllCourses(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(this.serverUrl + "courses");
  }

  getCoursesByNameOrDate(searchInput: string): Observable<Courses[]> {
    
    searchInput = searchInput.trim();

    const options = searchInput
      ? { params: new HttpParams().set("searchInput", searchInput) }
      : {};
    return this.httpClient.get<Courses[]>(this.serverUrl + "courses", options);
  }

  getCourseById(id: number): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(this.serverUrl + "courses/" + id);
  }
  deleteCourse(id: number): Observable<any> {
    return this.httpClient.delete(this.serverUrl + "courses/" + id);
  }
  addNewCourses(courseInput:Courses): Observable<any> {
    return this.httpClient.post(this.serverUrl + "courses", courseInput);
  }

  getAllAuthors(): Observable<Authors[]> {
    return this.httpClient.get<Authors[]>(this.serverUrl + "courses");
  }
}
