import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { ChecklistItem } from '../_models/checklistItem';
import { MatDialog } from '@angular/material/dialog';
import { ChecklistEditComponent } from '../checklist-edit/checklist-edit.component';
import { ChecklistService } from '../service/ChecklistService';
import { SnackBarService } from '../service/snack-bar.service';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css'],
})
export class ChecklistComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'complete',
    'description',
    'dateEnd',
    'datePost',
    'category',
    'actions',
  ];

  public dataSource: ChecklistItem[] = [];

  constructor(
    private dialog: MatDialog,
    private checklistService: ChecklistService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    this.checklistService
      .getAllChecklist()
      .subscribe((resp: ChecklistItem[]) => {
        this.dataSource = resp;
      });
  }

  public updateCompleteStatus(status: boolean) {
    console.log('Status criado', status);
  }

  public createNewItem() {
    console.log('Criar novo item clicado!');

    this.dialog
      .open(ChecklistEditComponent, {
        disableClose: true,
        data: { actionName: 'Criar' },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.snackBarService.showSnackBar('Item Criado com sucesso!', 'OK');
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Criar!', 'OK');
        }
      });
  }

  public updateChecklistItem(checklistItem: ChecklistItem) {
    console.log('atualizado item do checklist!');

    this.dialog
      .open(ChecklistEditComponent, {
        disableClose: true,
        data: { updateChecklistItem: checklistItem, actionName: 'Editar' },
      })
      .afterClosed()
      .subscribe((resp) => {
        if (resp) {
          this.snackBarService.showSnackBar('Item Editado com sucesso!', 'OK');
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Editar!', 'OK');
        }
      });
  }

  public deleteChecklistItem(checklist: ChecklistItem) {
    console.log('deletado item do checklist!');

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
          this.snackBarService.showSnackBar('Item Apagado com sucesso!', 'OK');
        } else {
          this.snackBarService.showSnackBar('Existe erro ao Apagar!', 'OK');
        }
      });
  }
}
