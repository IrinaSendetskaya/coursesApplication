import { COURSE_ACTION, CourseActions } from "../actions/courses.action";
import { LoginActions, LOGIN_ACTION } from "../actions/login.action";
import { UserActions, USER_ACTION } from "../actions/users.action";

const initialState = {
  currentUser: {},
  courses: [],
  users: []
};

export function coursesReducer(
  state = initialState,
  action: CourseActions | LoginActions | UserActions
) {
  switch (action.type) {
    case LOGIN_ACTION.GET_CURRENT_USER:
      return {
        ...state,
        currentUser: [action.payload]
      };
    case COURSE_ACTION.LOAD_COURSES:
      return {
        ...state,
        courses: [...action.payload]
      };
    case COURSE_ACTION.ADD_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload]
      };
    case COURSE_ACTION.DELETE_COURSE:
      return {
        ...state,
        courses: [
          ...state.courses.filter(course => course.id !== action.payload)
        ]
      };
    case COURSE_ACTION.UPDATE_COURSE:
      return {
        ...state,
        courses: [...state.courses]
      };
    case USER_ACTION.LOAD_USERS:
      return {
        ...state,
        users: [action.payload]
      };
    case USER_ACTION.ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    default:
      return state;
  }
}
