import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../_models/category';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  public getAllCaregories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiBaseEndpointUrl}categories`);
  }

  public saveCategory(category: Category): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}categories`, category);
  }

  public updateCategory(category: Category): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}categories`, category);
  }

  public deleteCategory(guid: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}categories/${guid}`);
  }
}
