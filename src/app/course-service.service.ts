import { Injectable } from '@angular/core';
//import { courses } from './courses';
import {Course} from './course'
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection, associateQuery, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, merge } from 'rxjs';
import { of } from 'rxjs';
import { MarkService } from './mark.service';
import { map } from 'rxjs/operators';
import { async } from '@angular/core/testing';
import { AngularFireStorage } from '@angular/fire/storage';
import { core } from '@angular/compiler';
import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class CourseService {
  
  private dbCourse = '/courses';
  private imgPath='https://firebasestorage.googleapis.com/v0/b/courseevaluatingsystem.appspot.com/o/agh.jpg?alt=media&token=4c015a8e-7098-4e3c-b685-ba3f18fa714f';
  coursesRef: AngularFirestoreCollection<Course> = null;
  courses:any;
  course:any;

  constructor(private db: AngularFirestore, private markService:MarkService,
    private afStorage: AngularFireStorage, private authService:AuthService,
    private userService:UsersService) {
    this.coursesRef = db.collection<Course>(this.dbCourse);
    //this.initDb(); 
  }

  getCourses(): AngularFirestoreCollection<Course> { return this.coursesRef; }

  saveCourse(course): Promise<any> {
    if (course.key!=null) {
      return this.coursesRef.doc(course.id).update(course);
    } else {
      return this.coursesRef.doc(course.id).set(course);
    }
  }
  addMark(mark:number,course:Course):any{
    let m=this.authService.getEmail(); 
    console.warn(m);
    if (course.id) {
      return this.coursesRef.doc(course.id).set({mark: {m}}, {merge:true});
    }
  }

  deleteCourse(id: string): Promise<void> {  return this.coursesRef.doc(id).delete();}
  
  getCourse(id: string):any {  
    return this.db.doc(this.dbCourse+'/'+id).valueChanges();
  }

  addCourse(item: Course) { this.saveCourse(item); }

  getNewCourse(name:string, id: string, ects: number, semestr: number, form: string, students:Array<string>,
    capacity: number, mark: any, image:string, description: string): Course{    
    var course:Course={
      name:name, id: id, ects: ects, semestr: semestr, form: form, students:students,
      capacity: capacity, mark: mark, image:image, description: description};
    return course;
  }

  getVacantSeats(course:Course):number{
    return course.capacity-course.students.length;
  }

  setImg(course:Course){ course.image=this.imgPath; }
  studentOnList(course:Course):boolean{
    if(course && course.students.includes(this.authService.getEmail())) return true;
    else return false;
  }
  addStudentOnList(course:Course){
    if (this.getVacantSeats(course)>0){
      course.students.push(this.authService.getEmail());
      this.saveCourse(course);
    }
  }
  deleteStudentFromList(course:Course){
    if (this.studentOnList(course)){
      const index = course.students.indexOf(this.authService.getEmail(), 0);
      if (index > -1)course.students.splice(index, 1);
      this.saveCourse(course);
    }
  }

  initDb() {
    this.addCourse(this.getNewCourse(
      'Analiza matematyczna 1',
      'am1', 
      6, 
      1, 
      'projekt',  // wykład, ćwiczenia, lab, projekt
      ["user1@agh.edu.pl","user2@agh.edu.pl"],   
      3, 
      this.markService.getNewMark(["user1@agh.edu.pl"],[3]), 
      this.imgPath, 
      'W ramach zajęć student powinien opanować podstawy rachunku różniczkowego i całkowego funkcji jednej zmiennej wraz z przykładowymi zastosowaniami.')),
      
      this.addCourse(this.getNewCourse(
        'Analiza matematyczna 2', 
        'am2', 
        6, 
        2, 
        'wykład', // wykład, ćwiczenia, lab, projekt
        ["user1@agh.edu.pl","user2@agh.edu.pl"],  
        50, 
        this.markService.getNewMark(["user1@agh.edu.pl"],[3]), 
        this.imgPath,
        'W ramach zajęć student powinien opanować podstawy rachunku różniczkowego funkcji wielu zmiennych, całki wielokrotne i krzywoliniowe oraz teorię szeregów liczbowych, potęgowych i Fouriera .')),
    
      this.addCourse(this.getNewCourse( 
        'Matematyka Dyskretna',
        'md', 
        5, 
        1, 
        'wykład', // wykład, ćwiczenia, lab, projekt
        ["user1@agh.edu.pl","user2@agh.edu.pl"],   
        3, 
        this.markService.getNewMark(["user1@agh.edu.pl"],[3]), 
        this.imgPath,
        'Zapoznanie z podstawowymi pojęciami, metodami oraz problemami matematyki dyskretnej pod kątem zastosowań w modelowaniu systemów informatycznych.')),
    
      this.addCourse(this.getNewCourse(
        'Wstęp do informatyki', 
        'wdi', 
        6, 
        1, 
        'wykład', // wykład, ćwiczenia, lab, projekt
        ["user1@agh.edu.pl","user2@agh.edu.pl"],   
        3, 
        this.markService.getNewMark(["user1@agh.edu.pl"],[3]), 
        this.imgPath, 
        'Celem przedmiotu jest zapoznanie studentów z podstawowymi pojęciami informatyki, programowaniem w języku proceduralnym oraz wprowadzenie do podstawowych algorytmów i struktur danych.')),
    
      this.addCourse(this.getNewCourse(
        'Wprowadzenie do systemu UNIX',
        'unix', 
        2, 
        1,
        'wykład', // wykład, ćwiczenia, lab, projekt
        ["user1@agh.edu.pl","user2@agh.edu.pl"],   
        3, 
        this.markService.getNewMark(["user1@agh.edu.pl"],[3]), 
        this.imgPath,
        'Celem modułu jest wyposażenie studenta/studentki w umiejętność korzystania z systemu operacyjnego UNIX i na nim bazujących wykorzystując wiedzę o jego budowie i umiejętności praktyczne.')),
        
      this.addCourse(this.getNewCourse(
        'Algorytmy i struktury danych', 
        'asd', 
        6, 
        2,
        'wykład', // wykład, ćwiczenia, lab, projekt
        ["user1@agh.edu.pl","user2@agh.edu.pl"],   
        3, 
        this.markService.getNewMark(["user1@agh.edu.pl"],[3]), 
        this.imgPath, 
        'Przedmiot zapoznaje studentów z podstawowymi algorytmami, strukturami danych, oraz metodami tworzenia i analizy algorytmów',))
  }
}