import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users-service';
import { GenericGridComponent } from '../../generic-grid-component/generic-grid-component';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, FormsModule, GenericGridComponent],
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
})
export class UsersList implements OnInit {
  users: any[] = [];
  total: number = 0;
  page: number = 1;
  perPage: number = 10;
  loading: boolean = false;
  searchText: string = '';

  columns = [
    { field: 'id', header: 'ردیف' },
    { field: 'f_name', header: 'نام' },
    { field: 'l_name', header: 'نام خانوادگی' },
    { field: 'email', header: 'ایمیل' },
    { field: 'phone_number', header: 'شماره موبایل' },
    { field: 'internal_number', header: 'شماره داخلی' },
  ];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.usersService
      .getUsers({
        page: this.page,
        perPage: this.perPage,
        search: this.searchText,
      })
      .subscribe({
        next: (res: { items: any[]; total: number; meta: any }) => {
          this.users = res.items;
          this.total = res.meta.totalCount;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading users:', err);
          this.loading = false;
        },
      });
  }

  onSearch(): void {
    this.page = 1;
    this.loadUsers();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadUsers();
  }

  onEdit(user: any): void {
    console.log('Edit user:', user);
    // TODO: Open modal for edit
  }

  onDelete(user: any): void {
    if (confirm('آیا از حذف این کاربر مطمئن هستید؟')) {
      this.usersService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== user.id);
          alert('کاربر با موفقیت حذف شد.');
        },
        error: (err) => {
          console.error('Error deleting user:', err);
        },
      });
    }
  }

  onAddUser(): void {
    console.log('Add new user');
    // TODO: Open modal for add new user
  }
}
