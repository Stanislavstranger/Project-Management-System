import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appTitle = 'Project Management System';
  isLoggedIn = true;
  login: string | null = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    this.login = this.authService.getLogin();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  logOut() {
    if (confirm('Are you sure you want to go out?')) {
      this.authService.logOut();
      this.authService.removeToken();
    }
  }
}
