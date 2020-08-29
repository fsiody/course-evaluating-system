import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import * as firebase from 'firebase/app';
import { UsersService } from './user.service';
import { Roles } from './user-data';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';



export interface Credentials {
  email: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  rolesCollection:AngularFirestoreCollection<Roles>;
  roles:any;



  constructor(private fireAuth: AngularFireAuth, private userService:UsersService) {
    fireAuth.authState.subscribe(auth => {
      if(this.loggedIn()) {
        alert("Zalogowano");   
        console.log('logged in - zmiana stanu');
        console.log(auth);
      } else {
        alert("Wylogowano"); 
        console.log('not logged in - zmiana stanu');
        console.log(auth);
      }
    });
    console.log("Start");

    this.rolesCollection=userService.getUsers()
    this.rolesCollection.snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(roles=>{this.roles=roles});
  }

  isAdmin():boolean{
    return (this.roles[0].admin.indexOf(this.getEmail())!=-1);
  }


  getUser(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  getEmail():string{
    return this.fireAuth.auth.currentUser.email;
  }

  login({email, password}: Credentials) {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  register({email, password}: Credentials) {
    return this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }

  loggedIn():boolean{
   // console.warn("CURR_USER:  ",this.fireAuth.auth.currentUser);
    if(this.fireAuth.auth.currentUser) return true;
    else return false;
  }
}