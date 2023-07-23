import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  formData = {
    name: '',
    login: '',
    password: '',
  };
  hide = true;

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.signUp(this.formData).subscribe(
      (response) => {
        console.log('Пользователь зарегистрирован:', response);
      },
      (error) => {
        console.error('Ошибка регистрации:', error);
      }
    );
  }
}
