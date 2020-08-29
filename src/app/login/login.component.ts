import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }

  registerInfo = '';

  constructor(
    private router: Router,
    private authService: AuthService
    ) {}

  login() {
    this.authService.login(this.credentials)
      .then(() => this.router.navigate(['/courseList']))
      .catch(err => console.log(err.message));
  }

  register() {
    this.authService.register(this.credentials)
      .then(() => this.registerInfo = 'ACCOUNT CREATED, PLEASE LOGIN IN! :)')
      .catch(err => this.registerInfo = err.message);
  }
}
