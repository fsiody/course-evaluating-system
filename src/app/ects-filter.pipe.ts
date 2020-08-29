import { Pipe, PipeTransform } from '@angular/core';
import {Course} from './course'

@Pipe({
  name: 'ectsFilter'
})
export class EctsFilterPipe implements PipeTransform {

  
  transform(courses: Course[],  emin:string, emax:string):Course[] {
    if (!courses) return [];
    if ((emin==="" && emax==="") || (!emin && !emax)) return courses;
    if(emin!=="" && emin) var eminf =  Number(emin);
    if(emax!=="" && emax) var emaxf =  Number(emax);
    
    if(eminf!==NaN && eminf) courses=courses.filter(course => { return Number(course.ects)>=eminf;});
    if(emaxf!==NaN && emaxf) {
      courses=courses.filter(course => { return Number(course.ects)<=emaxf;});
    }
    return courses;  
  }

}
