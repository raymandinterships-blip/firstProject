import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface GridResponse<T> {
  result: {
    data: {
      items: T[];
      _links: {
        self: string;
        first: string;
        last: string;
      };
      _meta: {
        totalCount: number;
        pageCount: number;
        currentPage: number;
        perPage: number;
      };
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = 'http://192.168.180.181:1234/users';
  constructor(private http: HttpClient) {}
  getUsers(
    page: number = 1,
    perPage: number = 10
  ): Observable<{ items: any[]; total: number; meta: any }> {
    const url = `${this.baseUrl}?page=${page}&per-page=${perPage}`;
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<GridResponse<any>>(url, { headers }).pipe(
      map((response) => {
        const data = response?.result?.data;
        return {
          items: data?.items ?? [],
          total: data?._meta?.totalCount ?? 0,
          meta: data?._meta ?? {},
        };
      })
    );
  }

  addUser(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
