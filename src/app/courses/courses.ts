import { DatePipe } from '@angular/common';
import { __param } from 'tslib';
import { format } from 'util';

export class Courses implements ICourse{
    id:number;
    name: string;
    date: Date;
    duration:number;
    description:string;
    authors:[{}];
  }
  
  interface ICourse {
    id:number;
    name: string;
    date: Date;
    duration:number;
    description:string;
    authors:[{}];
  }
  