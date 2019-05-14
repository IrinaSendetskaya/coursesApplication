import { COURSE_ACTION, CourseActions } from "../actions/courses.action";
import { LoginActions, LOGIN_ACTION } from "../actions/login.action";
import { UserActions, USER_ACTION } from "../actions/users.action";

const initialState = {
  isLogged: false,
  currentUser:{},
  courses: [],
  users: []
};

export function coursesReducer(
  state = initialState,
  action: CourseActions | LoginActions | UserActions
) {
  switch (action.type) {
    case LOGIN_ACTION.LOGIN_USER:
      return {
        ...state,
        currentUser:[JSON.parse(localStorage.getItem("user"))],
        isLogged:[!!action.payload]
      };
      case LOGIN_ACTION.LOGOUT_USER:
      return {
        ...state,
        currentUser:[JSON.parse(localStorage.getItem("user"))],
        isLogged: [action.payload]
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
          ...state.courses.filter(course => course.id !== action.payload.id)
        ]
      };
    case COURSE_ACTION.UPDATE_COURSE:
      return {
        ...state,
        courses: [...state.courses]
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
