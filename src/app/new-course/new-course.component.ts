import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CourseService} from '../course-service.service';
import { Course } from '../course';
import {Mark} from '../mark'
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-course',
  templateUrl: './new-course.component.html',
  styleUrls: ['./new-course.component.css']
})
export class NewCourseComponent implements OnInit {
//  infoItems;
  newCourseInfo:FormGroup;
  course: Course;

  constructor(private formBuilder: FormBuilder, public cs: CourseService,
    private authService:AuthService,    
    private route: ActivatedRoute,
    private router: Router,
    
    ) {
      
  }

  ngOnInit():void {
    if(!this.authService.loggedIn()) {
      console.log("!logedin");
      this.router.navigate(['/login']);
    }

    this.course={ name:"", id: "", ects: 0, semestr: 1, form: "",
        capacity: 0, mark:{students:[],marks:[]}, students:[], image:"", description: '...'};
      this.cs.setImg(this.course);
    console.warn(this.course); //  NEW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    this.newCourseInfo=this.formBuilder.group({
      name : new FormControl(this.course.name, 
        [ Validators.required]),
      id:   new FormControl(this.course.id, 
        [Validators.required, Validators.maxLength(10)]), //            string < 10
      ects: new FormControl( this.course.ects, 
        [Validators.required, Validators.max(40), Validators.min(0)]), //     -1 < number < 30
      semestr: new FormControl( this.course.semestr, 
        [Validators.required, Validators.max(12), Validators.min(0)]), //   0 < number < 10
      form: new FormControl( this.course.form, 
        [Validators.required]), //          string = wykład, ćwiczenia, lab, projekt
      capacity: new FormControl( this.course.capacity, 
        [Validators.required, Validators.min(0)]), //  0 < number
    //  image: new FormControl( this.course.image,   [Validators.required]),   
      description: new FormControl( this.course.ects, 
        [Validators.required]),
    })

  }

  onSubmit(){
    // TODO: Use EventEmitter with form value
    console.warn(this.course);
    this.cs.addCourse(this.course);
    this.newCourseInfo.reset();
    window.alert("Kurs został dodany!");
   // this.infoItems = this.courseService.clearInfo();
    
  }


}
