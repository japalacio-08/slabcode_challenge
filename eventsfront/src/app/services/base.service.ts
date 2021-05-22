
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface BaseEntity {
  id: number;
  name: string;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T;
  message?: string | boolean;
  errors?: string[] | string;
}

export type responseType = 'arraybuffer' | 'blob' | 'json' | 'text';

@Injectable()
export class BaseService {
  public baseUrl = environment.apiUrl;
  public baseVersion = environment.apiVersion;

  constructor(public http: HttpClient) {}
  public async get<T>(url: string): Promise<ApiResponse<T>> {
    return await this.http.get<ApiResponse<T>>(url).toPromise();
  }

  public async post<T, S>(url: string, payload: S): Promise<ApiResponse<T>> {
    return await this.http.post<ApiResponse<T>>(url, payload).toPromise();
  }

  public async put<T, S>(url: string, payload: S): Promise<ApiResponse<T>> {
    return await this.http.put<ApiResponse<T>>(url, payload).toPromise();
  }

  public async patch<T, S>(url: string, payload: S): Promise<ApiResponse<T>> {
    return await this.http.patch<ApiResponse<T>>(url, payload).toPromise();
  }

  public async delete<T, S>(url: string, payload: S): Promise<ApiResponse<T>> {
    return await this.http.delete<ApiResponse<T>>(url, payload).toPromise();
  }
}
