import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent{
  appTitle = 'Project Management System';
  isLoggedIn = true;

  constructor(private authService: AuthService) {}

  ngDoCheck(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}
