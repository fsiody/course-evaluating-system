import { Component, OnInit } from '@angular/core';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CourseService } from '../course-service.service';
import { Course } from '../course';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { MarkService } from '../mark.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {

  course:Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private markService: MarkService,
    private authService:AuthService
    ) {
   }


  ngOnInit() {
    if(!this.authService.loggedIn()) {
      console.log("!logedin");
      this.router.navigate(['/login']);
    }
    let id=this.route.snapshot.paramMap.get('id');
    this.course = this.courseService.getCourse(id).subscribe(course=>{this.course=course;console.log(this.course);}); 
    console.log(this.course);
  }

  deleteCourse(id:string){
    this.courseService.deleteCourse(id);
  };

  addMark(m:number){
    this.markService.addMark(m,this.course);
    console.warn(this.course);
    console.warn(this.courseService.saveCourse(this.course));
    //this.course.mark=Object.assign(this.course.mark,this.course.mark);
    //this.courseService.saveCourse(this.course);
  }

}
