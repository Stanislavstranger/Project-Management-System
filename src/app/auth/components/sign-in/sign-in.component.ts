import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  hide = true;
  formData!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
      ]),
    });
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['boards-list']);
    }
  }

  onSubmit() {
    this.authService.signIn(this.formData.value).subscribe(
      (response) => {
        this.authService.saveToken(this.formData.value.login, response.token);
        this.router.navigate(['boards-list']);
      },
      (error) => {}
    );
  }
}
