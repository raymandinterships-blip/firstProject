import { Component } from '@angular/core';
import { Header } from './header/header';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,Header,Navbar,Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {

}
