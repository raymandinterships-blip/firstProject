import { Component } from '@angular/core';
import { UserManagementComponent } from '../../user-management-component/user-management-component';

@Component({
  selector: 'app-home',
  imports: [UserManagementComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
