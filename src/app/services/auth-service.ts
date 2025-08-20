import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  username: string;
  password: string;
  token:string
  // id: string;
  // lastName: string;
  // email: string;
  // phoneNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://192.168.180.181:1234/users/login';
  constructor(private http: HttpClient) {}
  login(user: User): Observable<User> {
    const headers =new HttpHeaders({
      'Content-Type':'application/json'
    })
    return this.http.post<User>(this.authUrl, user ,{headers});
  }
}
