import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { ChecklistItem } from '../_models/checklistItem';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-checklist-edit',
  templateUrl: './checklist-edit.component.html',
  styleUrls: ['./checklist-edit.component.css'],
})
export class ChecklistEditComponent implements OnInit {
  /**
   * Nome da ação que será exibido no título do modal.
   */
  public actionName = 'Editar';
  /**
   * Item de checklist que será editado.
   */
  public checklistItem!: ChecklistItem;

  /**
   * Construtor da classe.
   * @param modalRef Referência do modal.
   * @param data Dados do item de checklist.
   */
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

  /**
   * Método chamado quando o formulário é fechado.
   * @param $event Evento de fechamento do formulário.
   */
  public onFormClose($event: any) {
    if ($event != null) this.modalRef.close($event);
  }
}
