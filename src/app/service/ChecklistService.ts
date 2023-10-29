import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChecklistItem } from '../_models/checklistItem';

export const CHECKLIST_DATA = [
  {
    complete: true,
    description: 'Ir ao Bar',
    dateEnd: new Date(),
    datePost: new Date(),
    category: {name: 'Sáude', guid: 'aaa-bbb-ccc-ddd'},
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    complete: false,
    description: 'Aprender Angular',
    dateEnd: new Date(),
    datePost: new Date(),
    category: {name: 'Educação', guid: 'aaa-bbb-ccc-ddd'},
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    complete: false,
    description: 'Reuniao segunda, to fudido!',
    dateEnd: new Date(),
    datePost: new Date(),
    category: {name: 'Trabalho', guid: 'aaa-bbb-ccc-ddd'},
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    complete: false,
    description: 'nao sei o que dizer',
    dateEnd: new Date(),
    datePost: new Date(),
    category: {name: 'Outros', guid: 'aaa-bbb-ccc-ddd'},
    guid: 'aaa-bbb-ccc-dddd',
  },
];

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor() { }

  public getAllChecklist(): Observable<ChecklistItem[]> {
    return of(CHECKLIST_DATA);
  }

}
