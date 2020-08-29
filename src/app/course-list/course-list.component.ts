import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService} from '../course-service.service';
import {NgForm} from '@angular/forms';
import {  Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Course } from '../course';
import { AuthService } from '../auth.service';

import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { MarkService } from '../mark.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  
  pageNumber:number;
  coursesPerPage:number;
  coursesLen:number;
  selected:Course;
  courses:any;  
  courses1:any;
  operationMessage = null;

  filtering:boolean;
  name:string;
  semestr:string;
  omin:string; omax:string;
  emin:string; emax:string;
  
  filter={name:this.name, semestr:this.semestr, omin:this.omin, omax:this.omax, emin:this.emin, emax:this.emax};

  constructor(
    public courseService:CourseService,
    private markService:MarkService,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService
    ) 
    { 
   // this.courses=courseService.getCourses();
    //this.coursesLen= this.courses1.length();
    this.pageNumber=1;
    this.coursesPerPage=5;
    this.filtering=false;

  }

  //setCourses():void{  this.courseService.getCourses();};
  deleteCourse(course:Course){    
    let deletePromise = this.courseService.deleteCourse(course.id);
    let parent = this;

    deletePromise.then(function () {
      parent.selected = null;
      parent.operationMessage = "Kurs został usunięty.";
      setTimeout(function () {
        parent.operationMessage = null;
      }.bind(this), 2000);
    });
  
  
  
  };
  shownCourse(i:number):boolean{
    if(i >= (this.pageNumber-1)*this.coursesPerPage && !(i > this.pageNumber*this.coursesPerPage-1)){ return true;}
    else { return false; }
  }
  filterOn(){this.filtering=true;}
  filterOff(){this.filtering=false;}
  getFiltering():boolean{return this.filtering;}

  showNext(){
    if(this.coursesLen/this.coursesPerPage>this.pageNumber) {
      this.pageNumber++;
    }
  }
  showPrev(){ if(this.pageNumber>1) this.pageNumber--; }
  gotoDetail(course : Course): void { 
    this.router.navigate(['/course', course.id]); }


  ngOnInit() {
    if(!this.authService.loggedIn()) {
      console.log("!logedin");
      this.router.navigate(['/login']);
    }

    this.courseService.getCourses().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(courses => {this.courses1 = courses; this.coursesLen=courses.length });
    
  }


}


