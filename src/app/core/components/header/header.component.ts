import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  ActivatedRoute,
  ResolveEnd,
  ResolveStart,
  Router,
} from '@angular/router';
import { filter, mapTo, merge, Observable } from 'rxjs';
import { Route } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  appTitle = 'Project Management System';
  isLoggedIn = true;
  login: string | null = '';

  private showLoader!: Observable<boolean>;
  private hideLoader!: Observable<boolean>;

  isLoading!: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hideLoader = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      mapTo(false)
    );

    this.showLoader = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      mapTo(true)
    )

    this.isLoading = merge(this.hideLoader, this.showLoader);
  }

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
