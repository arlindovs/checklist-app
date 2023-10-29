import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = [];

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCaregories().subscribe((resp: Category[]) => {
      this.dataSource = resp;
    });
  }

  public editCategory(inputCategory: Category) {
    console.log('edit category clik');

    this.dialog
      .open(CategoryEditComponent, {
        disableClose: true,
        data: {
          editableCategory: inputCategory,
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

    this.dialog
      .open(CategoryEditComponent, {
        disableClose: true,
        data: {
          actionName: 'Criar',
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        console.log('Modal Criar Fechada!');
      });
  }
}
