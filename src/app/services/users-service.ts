import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpService } from './http-service';
import { User } from './auth-service';

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
  private baseUrl = 'users';

  constructor(private httpService: HttpService) {}

  getUsers(
    params: {
      page?: number;
      perPage?: number;
      sortColumn?: string;
      sortDirection?: 'asc' | 'desc' | '';
      search?: string;
      filters?: Record<string, string>;
    } = {}
  ): Observable<{ items: User[]; total: number; meta: any }> {
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

    return this.httpService.get<GridResponse<User>>(url).pipe(
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

  addUser(user: User) {
    return this.httpService.post(this.baseUrl + '/create-user', user);
  }

  updateUser(user: User) {
    return this.httpService.post(`${this.baseUrl + '/update-user'}`, user);
  }

  deleteUser(id: number) {
    return this.httpService.delete(`${this.baseUrl}/${id}`);
  }
}
