import { Pipe, PipeTransform } from '@angular/core';
import {Course} from './course'

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {

  
  transform(courses: Course[], name:string):Course[] {
    if (!courses) return [];
    if (name==="" || !name) return courses;
    name = name.toLowerCase();

    courses=courses.filter(course => { return course.name.toLowerCase().includes(name);});
    return courses;

  }

}
