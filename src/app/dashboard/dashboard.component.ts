import { Component, OnInit } from '@angular/core';
import { AuthService} from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //user = this.authService.user;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
