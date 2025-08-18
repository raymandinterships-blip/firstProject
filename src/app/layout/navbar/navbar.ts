import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [NgFor],
  standalone:true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  navItems=[
    { label:'Home' , link:'home' ,active:true },
    { label:'About' , link:'about' ,active:false},
    { label:'Login' , link:'userform',active:false },
    { label:'Contact Us' , link:'contactus',active:false},
    {label:"Products" ,link:"products", active:false}
  ]
}
