import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ChecklistItem } from '../_models/checklistItem';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {

  constructor(private httpClient: HttpClient) { }

  public getAllChecklistItem(): Observable<ChecklistItem[]> {
  return this.httpClient.get<ChecklistItem[]>(`${environment.apiBaseEndpointUrl}checklist-items`);
  }

  public saveChecklistItem(checklistItem: ChecklistItem): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  public updateChecklistItem(checklistItem: ChecklistItem): Observable<void> {
    return this.httpClient.put<void>(`${environment.apiBaseEndpointUrl}checklist-items`, checklistItem);
  }

  public deleteChecklistItem(guid: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseEndpointUrl}checklist-items/${guid}`);
  }
}
