import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [NgFor, NgIf, RouterLinkActive, RouterLink],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router, private toastr: ToastrService) {}
  navItems = [
    { label: 'کاربران', link: '/home' },
    { label: ' گزارشات آماری', link: '/about' },
    { label: ' تماس با ما', link: '/contactus' },
    { label: 'محصولات', link: '/products' },
  ];
  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
  logout() {
    sessionStorage.removeItem('token');
    this.toastr.info(' خروج کاربر ');
    this.router.navigate(['/login']);
  }
}
