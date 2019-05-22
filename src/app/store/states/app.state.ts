import { Course } from 'src/app/models/course';
import { User } from '../../models/user';

export interface AppState {
    
    courseState:{
        currentUser:User,
        courses:Course[],
        users:User[]
    }
}