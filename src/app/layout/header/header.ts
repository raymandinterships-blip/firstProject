import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-header',
  imports: [Navbar],
  standalone:true,
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
