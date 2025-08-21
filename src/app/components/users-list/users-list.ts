import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users-service';

@Component({
  selector: 'app-users-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList implements OnInit {
  users: any[] = [];
  total: number = 0;
  page: number = 1;
  perPage: number = 10;
  loading: boolean = false;

  constructor(private UsersService: UsersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.loading = true;
    this.UsersService.getUsers(this.page, this.perPage).subscribe({
      next: (res) => {
        console.log('api response', res);
        this.users = res.items;
        this.total = res.total;
        this.loading = false;
      },
      error: (err) => {
        console.log('error in finding users', err);
        this.loading = false;
      },
    });
  }
}
