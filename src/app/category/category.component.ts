import { Component, OnInit } from '@angular/core';
import { CATEGORY_DATA, Category } from '../_models/category';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = CATEGORY_DATA;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public editCategory(inputCategory: Category) {
    this.dialog
      .open(CategoryEditComponent, {
        disableClose: true,
        data: {
          editableCategory: inputCategory
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        console.log('Modal Editar Fechada!');
      });
  }

  public deleteCategory(category: Category) {
    this.dialog
      .open(DialogComponent, {
        disableClose: true,
        data: {
          dialogMsg: 'Realmente deseja apagar a categoria?',
          leftButtonLabel: 'Não',
          rightButtonLabel: 'Sim',
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          console.log('Apagado com Sucesso!');
        } else {
          console.log('Erro ao Apagar!');
        }
      });
  }

  public createNewCategory() {
    console.log('Cliquei em Novo!');
  }
}
