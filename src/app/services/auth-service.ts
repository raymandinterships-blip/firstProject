import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

export interface User {
  username: string;
  password: string;
  token: string;
  hasError: boolean;
  messages: [];

  }


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = 'http://192.168.180.7:9000/users/login';
  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(this.authUrl, user, { headers }).pipe(
      tap((response: any) => {
        if (response && response.result?.token) {
          sessionStorage.setItem('token', response.result.token);
        }
      }),
      catchError(err=>{
        console.error('Login error:',err)
        return of({hasError:true,messages:['خطا در لاگین']})
      })
    );
  }
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token');
  }
  logout(): void {
    sessionStorage.removeItem('token');
  }
}
