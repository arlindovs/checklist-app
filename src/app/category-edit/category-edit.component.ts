import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
})
export class CategoryEditComponent implements OnInit {
  public editableCategory!: Category;
  public actionName: string = 'Editar';

  /**
   * Componente responsável por editar uma categoria.
   * @constructor
   * @param {MatDialogRef<CategoryEditComponent>} dialogRef - Referência ao diálogo aberto.
   * @param {any} dialogData - Dados passados para o diálogo.
   */
  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) dialogData: any
  ) {
    if (dialogData.editableCategory != null) {
      this.editableCategory = dialogData.editableCategory;
    }
    if (dialogData.actionName != null) {
      this.actionName = dialogData.actionName;
    }
  }

  ngOnInit(): void {}

  /**
   * Fecha a janela modal.
   * @param $event - O evento que acionou o fechamento da janela modal.
   */
  public closeModalWindow($event: any) {
    if ($event != null) this.dialogRef.close($event);
  }
}
