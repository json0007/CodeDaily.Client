import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  async Get<T>(endpoint: string, id: string): Promise<T> {
    const url = `${environment.apiBaseUrl}${endpoint}/${id}`;
    return firstValueFrom(this.http.get<T>(url));
  }

  async GetAll<T>(endpoint: string): Promise<T[]> {
    const url = `${environment.apiBaseUrl}${endpoint}`;
    return firstValueFrom(this.http.get<T[]>(url));
}
}