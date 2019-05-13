import { Course } from 'src/app/models/course';
import { User } from '../models/user';

export interface AppState {
    
    courseState:{
        isLogged:boolean,
        courses:Course[],
        users:User[]
    }
}