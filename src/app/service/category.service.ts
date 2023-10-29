import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../_models/category';

export const CATEGORY_DATA = [
  { name: 'Educação', guid: 'aaa-bbb-ccc-dddd' },
  { name: 'Saúde', guid: 'aaa-bbb-ccc-dddd' },
  { name: 'Trabalho', guid: 'aaa-bbb-ccc-dddd' },
  { name: 'Outros', guid: 'aaa-bbb-ccc-dddd' },
];

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor() {}

  public getAllCaregories(): Observable<Category[]> {
    return of(CATEGORY_DATA);
  }
}
