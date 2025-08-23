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
  private baseUrl = 'http://192.168.180.7:9000/users';

  constructor(private http: HttpClient) {}

  getUsers(
    params: {
      page?: number;
      perPage?: number;
      sortColumn?: string;
      sortDirection?: 'asc' | 'desc' | '';
      search?: string;
      filters?: Record<string, string>;
    } = {}
  ): Observable<{ items: any[]; total: number; meta: any }> {
    const {
      page = 1,
      perPage = 10,
      sortColumn = '',
      sortDirection = '',
      search = '',
      filters = {},
    } = params;

    let url = `${this.baseUrl}?page=${page}&per-page=${perPage}`;

    if (sortColumn && sortDirection) {
      url += `&sort=${sortDirection === 'asc' ? '' : '-'}${sortColumn}`;
    }
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value) url += `&${key}=${encodeURIComponent(value)}`;
    });

    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<GridResponse<any>>(url, { headers }).pipe(
      map((response) => {
        const data = response?.result?.data;
        return {
          items: data?.items ?? [],
          total: data?._meta.totalCount ?? 0,
          meta: data?._meta ?? {},
        };
      })
    );
  }

  addUser(user: any): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(this.baseUrl, user, { headers });
  }

  updateUser(id: number, user: any): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.put(`${this.baseUrl}/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<any> {
    const token = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.baseUrl}/${id}`, { headers });
  }
}
