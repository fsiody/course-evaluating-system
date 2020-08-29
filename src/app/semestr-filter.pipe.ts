import { Pipe, PipeTransform } from '@angular/core';
import { Course} from "./course"


@Pipe({
  name: 'semestrFilter'
})
export class SemestrFilterPipe implements PipeTransform {

   
  transform(courses: Course[],  semestr:string):Course[] {
    if (!courses) return [];
    if (semestr==="" || !semestr) return courses;
    if(semestr!=="" && semestr) var semf =  Number(semestr);
    
    if(semf!==NaN && semf) courses=courses.filter(course => { return Number(course.semestr)===semf;});
    return courses;  
  }

}
