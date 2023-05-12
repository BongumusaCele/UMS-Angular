import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  title = 'UserManagement';
  ismenurequired = false;
  isadminuser = false;

  constructor(private router: Router, private service: AuthService) {}

  ngDoCheck(): void {
    let currenturl = this.router.url;
    if (currenturl == '/sign-in' || currenturl == '/sign-up') {
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }

    if (this.service.GetUserrole() === 'admin') {
      this.isadminuser = true;
    } else {
      this.isadminuser = false;
    }
  }

  checkRole() {
    if (this.service.GetUserrole() === 'admin') {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  session() {
    return localStorage.getItem('username');
  }
}
