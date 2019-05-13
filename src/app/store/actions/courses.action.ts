import { Action } from "@ngrx/store";
import { Course } from "src/app/models/course";

export namespace COURSE_ACTION {
  export const ADD_COURSE = "ADD_COURSE";
  export const DELETE_COURSE = "DELETE_COURSE";
  export const UPDATE_COURSE = "UPDATE_COURSE";
}

export class AddCourse implements Action {
  readonly type = COURSE_ACTION.ADD_COURSE;
  constructor(public payload: Course) {}
}
export class DeleteCourse implements Action {
  readonly type = COURSE_ACTION.DELETE_COURSE;
  constructor(public payload: Course) {}
}
export class UpdateCourse implements Action {
  readonly type = COURSE_ACTION.UPDATE_COURSE;
  constructor(public payload: Course) {}
}

export type CourseActions = AddCourse | DeleteCourse | UpdateCourse;
