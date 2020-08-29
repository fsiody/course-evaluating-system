import { Injectable } from '@angular/core';
import { Course } from './course';
import { AuthService } from './auth.service';
import { Mark } from './mark'

@Injectable({
  providedIn: 'root'
})
export class MarkService {
 
  constructor(
    private authService:AuthService
  ) { 
  }

  addMark(m:number, course:Course) {
    let email=this.authService.getEmail();
    if(course.mark.students.indexOf(email)==-1){
      course.mark.students.push(email);
      course.mark.marks.push(Number(m));
    }
    else{
      course.mark.marks[course.mark.students.indexOf(email)]=Number(m); 
    }
  }

  getMark(mark:Mark, students:Array<string>):number|string{
    var result=0; 
    if(mark && students){
      let counter=0;
      for(let s of mark.students){
        if(students.indexOf(s)!=-1){
          let m=mark.marks[mark.students.indexOf(s)];
          if(m!=0) {
            result+=m;
            counter++;
          }
        }
      }
      if(result!=0) 
      {
        result/=counter;
        result.toFixed(1);
      }
      else{
        return " "
      }
    }
    return result;
  }
  getMyMark(mark:Mark):number | null {
    return mark.marks[mark.students.indexOf(this.authService.getEmail())];
  }

  getNewMark(s:Array<string>, m:Array<number>):Mark{
    let mark:Mark={students:s,marks:m};
    return mark;
  }
}