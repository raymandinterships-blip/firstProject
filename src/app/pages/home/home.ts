import { Component } from '@angular/core';
import { UsersList } from "../../components/users-list/users-list";

@Component({
  selector: 'app-home',
  imports: [UsersList],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
