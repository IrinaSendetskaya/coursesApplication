import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Courses} from './courses';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  serverUrl='http://localhost:3000/api/';

  constructor(private httpClient:HttpClient) {}

  getAllCourses(): Observable<Courses[]> {
    return this.httpClient.get<Courses[]>(this.serverUrl+'courses');
  }
}

