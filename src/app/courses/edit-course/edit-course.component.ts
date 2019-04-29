import { Component, OnInit, OnDestroy } from '@angular/core';
import { Courses } from '../courses';
import { Subscription } from 'rxjs';
import { CoursesService } from '../courses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit,OnDestroy{

  messageClass: string;
  message: string;
  editSubscription: Subscription;
  findByIdSubscription: Subscription;

  courseInput: Courses = {
    id: 0,
    name: "",
    description: "",
    date:new Date(),
    duration: 0,
    authors: [{}]
  };
  
  constructor(
    private coursesService: CoursesService,
    private _router: Router
  ) {}

  ngOnInit() {
   this.findCourseById(this._router.routerState.snapshot.root.children[0].params.id);
  }
  ngOnDestroy() {
    this.unsubscribe(this.editSubscription);
    this.unsubscribe(this.findByIdSubscription);
  }

  findCourseById(id: string) {
    this.findByIdSubscription = this.findByIdSubscription=this.coursesService
      .getCourseById(id)
      .subscribe(data => (this.courseInput = data["courses"][0]));
  }

  editCourse() {
    console.log(this.courseInput);
    this.editSubscription = this.coursesService
      .editCourse(this.courseInput)
      .subscribe(course => {
        if (course) {
          this.messageClass = "alert alert-permit";
          this._router.navigate(["/courses"]);
        } else {
          this.message = "Вы ввели некорректные данные!";
          alert("Вы ввели некорректные данные!");
          this.messageClass = "alert alert-danger";
        }
      });
  }

  cancelEditCourse() {
    this._router.navigate(["/courses"]);
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }

}
