import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  constructor(private userService: UsersService) {}

  getUsers() {
    this.userService.getAllUsers().subscribe(
      (users) => {
        console.log('Пользователи:', users);
      },
      (error) => {
        console.error('Ошибка получения пользователей:', error);
      }
    );
  }
}
