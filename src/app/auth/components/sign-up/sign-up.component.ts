import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  hide = true;
  formData!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
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
    this.authService.signUp(this.formData.value).subscribe(
      (response) => {
        console.log('Пользователь зарегистрирован:', response);
        this.router.navigate(['signin']);
      },
      (error) => {
        console.error('Ошибка регистрации:', error);
        alert('Such a user already exists. Enter other details');
      }
    );
  }
}
