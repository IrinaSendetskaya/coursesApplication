import { COURSE_ACTION, CourseActions } from "../actions/courses.action";

const initialState = {
  courses: []
};

export function coursesReducer(state = initialState, action: CourseActions) {
  switch (action.type) {
    case COURSE_ACTION.ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    case COURSE_ACTION.DELETE_COURSE:
      return {
        ...state,
        courses: [...state.courses.filter(course=>course.id!==action.payload.id)]
      };
    case COURSE_ACTION.UPDATE_COURSE:
      return {
        ...state,
        courses: [...state.courses]
      };
    default:
      return state;
  }
}
