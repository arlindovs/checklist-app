import { Component, EventEmitter, OnInit } from '@angular/core';
import { ChecklistItem } from '../_models/checklistItem';

@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css']
})
export class ChecklistEditComponent implements OnInit {

public actionName = 'Editar';
public checklistItem!: ChecklistItem;
public formCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

ngOnInit(): void {
}

public onFormClose($event: any){

}

}
