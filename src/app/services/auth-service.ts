import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
private  authUrl = 'http://192.168.180.181/users/login';
  constructor(private http:HttpClient){}
  create(user:User):Observable<User>{
    return this.http.post<User>(this.authUrl,user)
  }
}
