import { DatePipe } from '@angular/common';

export class Courses implements ICourse{
    id:number;
    name: string;
    date: DatePipe;
    duration:number;
    description:string;
    authors:[{}];
  }
  
  interface ICourse {
    id:number;
    name: string;
    date: DatePipe;
    duration:number;
    description:string;
    authors:[{}];
  }
  