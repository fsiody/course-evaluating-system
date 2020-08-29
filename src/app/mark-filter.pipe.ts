import { Pipe, PipeTransform } from '@angular/core';
import { Course} from "./course"
import { MarkService } from './mark.service';

@Pipe({
  name: 'markFilter'
})
export class MarkFilterPipe implements PipeTransform {

 constructor(private markService:MarkService){}

  transform(courses: Course[], omin:string, omax:string):Course[] {
    if (!courses) return [];
    if ((omin==="" && omax==="") || (!omin && !omax)) return courses;
    if(omin!=="" && omin) var ominf =  Number(omin);
    if(omax!=="" && omax) var omaxf =  Number(omax);
    if(ominf!==NaN && ominf) courses=courses.filter(course => { return Number(this.markService.getMark(course.mark, course.students))>=ominf;});
    if(omaxf!==NaN && omaxf) courses=courses.filter(course => { return Number(this.markService.getMark(course.mark, course.students))<=omaxf;});
    return courses;  
  }
}
