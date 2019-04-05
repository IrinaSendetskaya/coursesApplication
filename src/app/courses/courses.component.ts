import { Component, OnInit } from '@angular/core';
import { User } from "./../login/login.component";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  user:User;
  userName:string;


  constructor() { }

}
