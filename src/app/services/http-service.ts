import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl = 'http://192.168.180.7:9000';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    return new HttpHeaders({
      'content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() }).pipe(
      retry(2),
      catchError(err=>{
        console.error('HTTP GET error:',err)
        return throwError(()=>err)
      })
    );
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders() }).pipe(
      retry(2),
      catchError(err=>{
        console.error('HTTP POST error:',err)
        return throwError(()=>err)
        
      })
    )
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers: this.getHeaders() }).pipe(
      retry(2),
      catchError(err=>{
        console.error('HTTP PUT error:',err)
        return throwError(()=>err)
      })
    )
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() }).pipe(
      retry(2),
      catchError(err=>{
        console.error('HTTP DELETE error:',err)
        return throwError(()=>err)
      })
    )
  }

  pauseMember(memberExtension:string,queueId:number){
    return this.post<any>('agent/pause',{memberExtension:memberExtension,queueId:queueId})
  }
  resumeMember(memberExtension:string,queueId:number){
    return this.post<any>('agent/resume',{memberExtension:memberExtension,queueId:queueId})
  }
}
