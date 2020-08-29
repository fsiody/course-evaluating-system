import { Injectable } from '@angular/core';
import { User, Roles } from "./user-data";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private dbPath = '/roles';
  private usersRef: AngularFirestoreCollection<Roles> = null;


  constructor(private db: AngularFirestore) {
    this.usersRef = db.collection(this.dbPath);
  }

  getUsers(): AngularFirestoreCollection<Roles> {
    return this.usersRef;
  }

}
