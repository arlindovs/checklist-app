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
  /**
   * Componente responsável por exibir a lista de categorias.
   *
   * @var displayedColumns - As colunas que serão exibidas na tabela.
   */
  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = [];

  /**
   * Componente responsável por exibir as categorias.
   *
   * @param dialog - Serviço para abrir diálogos modais.
   * @param categoryService - Serviço para gerenciar as categorias.
   * @param snackBarService - Serviço para exibir mensagens de notificação.
   */
  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private snackBarService: SnackBarService
  ) {}

  /**
   * Método que é executado quando o componente é iniciado.
   * Faz uma chamada ao serviço de categoria para obter todas as categorias e atribui o resultado à propriedade dataSource.
   */
  ngOnInit(): void {
    this.categoryService.getAllCaregories().subscribe((resp: Category[]) => {
      this.dataSource = resp;
    });
  }

  /**
   * Abre o componente de edição de categoria em um diálogo modal.
   * @param inputCategory A categoria a ser editada.
   * @returns Nenhum valor é retornado, mas uma mensagem de sucesso ou erro é exibida em um snack bar.
   */
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
          this.snackBarService.showSnackBar(
            'Categoria Alterada com sucesso!',
            'OK'
          );
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Alterar!', 'OK');
        }
      });
  }

  /**
   * Deleta uma categoria.
   * @param category A categoria a ser deletada.
   * @returns Nenhum retorno.
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
          this.snackBarService.showSnackBar(
            'Categoria Apagada com sucesso!',
            'OK'
          );
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Apagar!', 'OK');
        }
      });
  }

  /**
   * Cria uma nova categoria.
   * Abre um diálogo para edição da categoria e exibe uma mensagem de sucesso ou erro ao finalizar a operação.
   * @returns void
   */
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
          this.snackBarService.showSnackBar(
            'Categoria Criada com sucesso!',
            'OK'
          );
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Criar!', 'OK');
        }
      });
  }
}
