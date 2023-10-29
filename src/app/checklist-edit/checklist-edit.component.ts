import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { ChecklistItem } from '../_models/checklistItem';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css'],
})
export class ChecklistEditComponent implements OnInit {
  public actionName = 'Editar';
  public checklistItem!: ChecklistItem;

  constructor(
    public modalRef: MatDialogRef<ChecklistEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.updateChecklistItem != null) {
      this.checklistItem = data.updateChecklistItem;
    }
    if (data.actionName != null) {
      this.actionName = data.actionName;
    }
  }

  ngOnInit(): void {}

  public onFormClose($event: any) {
    if($event != null) this.modalRef.close($event);
  }
}
