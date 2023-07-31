import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EditUserData, User } from 'src/app/models/models';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  hide = true;
  formData!: FormGroup;
  login: string | null = '';
  userId: string | null = '';

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

    this.login = this.authService.getLogin();

    this.authService.getUserAll().subscribe(
      (users) => {
        this.userId = users
          .filter((user: any) => this.login === user.login)
          .map((user: any) => user._id);
      },
      (error) => {
        console.error('Ошибка получения пользователей:', error);
      }
    );
  }

  onSubmit() {
    const editUserData: EditUserData = {
      name: this.formData.value.name,
      login: this.formData.value.login,
      password: this.formData.value.password,
    };

    if (!this.userId) {
      console.error('Invalid boardId:', this.userId);
      return;
    }

    this.authService.putUserById(this.userId, editUserData).subscribe(
      (responce) => {
        this.formData.reset();
        localStorage.setItem('login', responce.login);
        this.router.navigate(['../']);
      },
      (error) => {
        console.error('Ошибка получения пользователей:', error);
      }
    );
  }

  deleteUserById() {
    if (!this.userId) {
      console.error('Invalid boardId:', this.userId);
      return;
    }

    const confirmation = window.confirm(
      'Are you sure you want to delete your profile?'
    );

    if (confirmation) {
      this.authService.deleteUserById(this.userId).subscribe(
        (responce) => {
          this.formData.reset();
          this.authService.removeToken();
          this.authService.logOut();
        },
        (error) => {
          console.error('Ошибка удаления пользователя:', error);
        }
      );
    }
  }
}
