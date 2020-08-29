import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'courseEvaluation';
  constructor(private router: Router, private authService: AuthService,private afStorage: AngularFireStorage) { }

  upload(event) {
    this.afStorage.upload('/upload', event.target.files[0]);  
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['login']))
      .catch(err => console.log(err.message));
  }
}
