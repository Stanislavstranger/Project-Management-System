import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  formData = {
    login: '',
    password: '',
  };

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.signIn(this.formData).subscribe(
      (response) => {
        console.log('Вход выполнен:', response);
        this.authService.saveToken(this.formData.login, response.token);
        console.log(this.authService.getToken(this.formData.login));
        this.authService.authorize();
        this.authService.getUserId();
      },
      (error) => {
        console.error('Ошибка входа:', error);
      }
    );
  }
}
