import { Component, OnInit } from '@angular/core';
import { Category } from '../_models/category';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryService } from '../service/category.service';
import { SnackBarService } from '../service/snack-bar.service';

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
    private categoryService: CategoryService,
    private snackBarService: SnackBarService,
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
        if (resp) {
          this.snackBarService.showSnackBar('Categoria Alterada com sucesso!', 'OK');
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Alterar!', 'OK');
        }
      });
  }

  /**
   * Deleta uma categoria após solicitar confirmação do usuário.
   * @param category A categoria a ser deletada.
   */
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
          this.snackBarService.showSnackBar('Categoria Apagada com sucesso!', 'OK');
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Apagar!', 'OK');
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
        if (resp) {
          this.snackBarService.showSnackBar('Categoria Criada com sucesso!', 'OK');
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Criar!', 'OK');
        }
      });
  }
}
