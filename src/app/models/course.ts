export interface Course{
    id?:number;
    name: string;
    date: Date;
    duration:number;
    description:string;
    authors:[{}];
  }