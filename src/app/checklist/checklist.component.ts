import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { ChecklistItem } from '../_models/checklistItem';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { ChecklistService } from '../service/checklist.service';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit {
  /**
   * Colunas exibidas na tabela de itens do checklist.
   */
  public displayedColumns: string[] = [
    'id',
    'complete',
    'description',
    'dateEnd',
    'datePost',
    'category',
    'actions',
  ];

  /**
   * Fonte de dados da tabela de itens do checklist.
   */
  public dataSource: ChecklistItem[] = [];

  /**
   * Construtor da classe.
   * @param dialog Serviço de diálogo do Angular Material.
   * @param checklistService Serviço responsável por gerenciar os itens do checklist.
   * @param snackBarService Serviço responsável por exibir mensagens de feedback ao usuário.
   */
  constructor(
    private dialog: MatDialog,
    private checklistService: ChecklistService,
    private snackBarService: SnackBarService
  ) {}

  /**
   * Método executado ao inicializar o componente.
   * Recupera todos os itens do checklist e atualiza a fonte de dados da tabela.
   */
  ngOnInit(): void {
    this.loadAllItems();
  }

  private loadAllItems() {
    this.checklistService
      .getAllChecklistItem()
      .subscribe((resp: ChecklistItem[]) => {
        this.dataSource = resp;
      },  (error: any) => {
        console.log(`Ocorreu um erro ao chamar a API: ${error}`);
    });
  }

  /**
   * Atualiza o status de conclusão de todos os itens do checklist.
   * @param status Novo status de conclusão dos itens.
   */
  public updateCompleteStatus(guid: string, status: boolean) {
    this.checklistService.updateCompleteStatus(guid, status).subscribe(
      (resp: any) => {
        this.snackBarService.showSnackBar('Status atualizado com sucesso!', 'OK');
        this.loadAllItems();
      },(error: any) => {
        this.snackBarService.showSnackBar('Erro ao atualizar status!', 'OK');
      }
    );
  }

  /**
   * Abre o diálogo para criar um novo item do checklist.
   * Exibe uma mensagem de feedback ao usuário após a criação do item.
   */
  public createNewItem() {
    this.dialog
      .open(ChecklistEditComponent, {
        disableClose: true,
        data: { actionName: 'Criar' },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.loadAllItems();
        }
      });
  }

  /**
   * Abre o diálogo para editar um item do checklist.
   * Exibe uma mensagem de feedback ao usuário após a edição do item.
   * @param checklistItem Item do checklist a ser editado.
   */
  public updateChecklistItem(checklistItem: ChecklistItem) {
    this.dialog
      .open(ChecklistEditComponent, {
        disableClose: true,
      data: { updateChecklistItem: checklistItem/*, actionName: 'Editar'*/ },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.loadAllItems();
          this.snackBarService.showSnackBar('Item atualizado com sucesso!', 'OK');
        }
      });
  }

  /**
   * Abre o diálogo para confirmar a exclusão de um item do checklist.
   * Exibe uma mensagem de feedback ao usuário após a exclusão do item.
   * @param checklist Item do checklist a ser excluído.
   */
  public deleteChecklistItem(checklist: ChecklistItem) {
    this.dialog
      .open(DialogComponent, {
        disableClose: true,
        data: {
          dialogMsg: 'Você deseja realmente apagar este item?',
          leftButtonLabel: 'Cancelar',
          rightButtonLabel: 'Apagar',
        },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {

          this.checklistService.deleteChecklistItem(checklist.guid).subscribe(
            (resp: any) => {
              this.loadAllItems();
              this.snackBarService.showSnackBar('Item Apagado com sucesso!', 'OK');
            },(error: any) => {
              this.snackBarService.showSnackBar('Erro ao apagar item!', 'OK');
            }
          )
        }
      });
  }
}
