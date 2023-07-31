import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-add-board',
  templateUrl: './add-board.component.html',
  styleUrls: ['./add-board.component.scss'],
})
export class AddBoardComponent implements OnInit {
  login: string | null = '';
  userData: any[] = [];
  options: string[] = [];
  owner: string = '';
  selectedUsers: string[] = [];

  boardsData!: FormGroup;

  constructor(
    private router: Router,
    private boardsService: BoardsService,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.boardsData = this.fb.group({
      title: new FormControl('', [Validators.required]),
      selectedUsers: [''],
    });

    this.login = this.authService.getLogin();

    this.authService.getUserAll().subscribe(
      (users) => {
        this.options = users
          .filter((user: any) => this.login !== user.login)
          .map((user: any) => user.login);
        this.userData = users;
      },
      (error) => {
        console.error('Ошибка получения пользователей:', error);
      }
    );
  }

  onSubmit() {
    const title = this.boardsData.get('title')?.value;

    const ownerUser = this.userData.find((user) => user.login === this.login);

    if (ownerUser) {
      this.owner = ownerUser._id;
    }

    const selectedUsersIds = this.boardsData
      .get('selectedUsers')
      ?.value.map((selectedLogin: string) => {
        const user = this.userData.find((user) => user.login === selectedLogin);
        return user ? user._id : '';
      });

    const boardData = {
      title: title,
      owner: this.owner,
      users: selectedUsersIds,
    };

    this.boardsService.createBoard(boardData).subscribe(
      (response) => {
        this.router.navigate(['boards-list']);
      },
      (error) => {
        console.error('Ошибка создания доски:', error);
      }
    );
  }
}
