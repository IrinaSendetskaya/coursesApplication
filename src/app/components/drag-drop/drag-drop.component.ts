import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subject } from "rxjs";
import { Author } from "../../models/author";
import { CoursesService } from "../../services/courses.service";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-drag-drop",
  templateUrl: "./drag-drop.component.html",
  styleUrls: ["./drag-drop.component.scss"]
})
export class DragDropComponent implements OnInit, OnDestroy {
  private componetDestroyed: Subject<any> = new Subject();
  authorsOutputList: Author[] = [];
  @Input() authorsConfirmList: Author[] = [];

  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.findAllAuthors();
  }

  ngOnDestroy() {
    this.componetDestroyed.next();
    this.componetDestroyed.complete();
  }

  findAllAuthors() {
    this.coursesService
      .getAllAuthors()
      .pipe(takeUntil<any>(this.componetDestroyed))
      .subscribe(authors => {
        return (this.authorsOutputList = authors);
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
}
