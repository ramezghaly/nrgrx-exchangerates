import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public formatDate(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  public parseDate(dateString:string){
    return new Date(Date.parse(dateString));
  }

  public addDays(date:Date, days:number){
    return new Date(new Date().setDate(date.getDate() + days));
  }
}
