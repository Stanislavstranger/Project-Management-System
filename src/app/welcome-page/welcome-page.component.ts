import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['boards-list']);
    }
  }
}
