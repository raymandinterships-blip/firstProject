import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [NgFor, NgIf],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  constructor(private router: Router, private toastr: ToastrService) {}
  navItems = [
    { label: 'خانه', link: 'home', active: true },
    { label: 'درباره ما', link: 'about', active: false },
    { label: ' تماس با ما', link: 'contactus', active: false },
    { label: 'محصولات', link: 'products', active: false },
  ];
  get isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
  logout() {
    sessionStorage.removeItem('token');
    this.toastr.info('logout successed ');
    this.router.navigate(['/login']);
  }
}
