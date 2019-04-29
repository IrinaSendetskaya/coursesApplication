import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChange
} from "@angular/core";
import { Subscription } from "rxjs";
import { Authors } from "../courses/courses.component";
import { Router } from "@angular/router";
import { CoursesService } from "../courses/courses.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-drag-drop",
  templateUrl: "./drag-drop.component.html",
  styleUrls: ["./drag-drop.component.css"]
})
export class DragDropComponent implements OnInit, OnDestroy {
  findAuthorsSubscription: Subscription;
  authorsOutputList: Authors[] = [];

  @Input() authorsConfirmList: Authors[] = [];

  constructor(
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    this.findAllAuthors();
  }

 
  ngOnDestroy() {
    this.unsubscribe(this.findAuthorsSubscription);
  }

  findAllAuthors() {
    this.findAuthorsSubscription = this.coursesService
      .getAllAuthors()
      .subscribe(authors => {
        return (this.authorsOutputList = authors["authors"]);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
      subscription = null;
    }
  }
}
