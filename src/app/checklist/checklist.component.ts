import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { CHECKLIST_DATA, ChecklistItem } from '../_models/checklistItem';
import { MatDialog } from '@angular/material/dialog';

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

  public dataSource = CHECKLIST_DATA;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  public updateCompleteStatus(status: boolean) {
    console.log('Status criado', status);
  }

  public createNewItem() {
    console.log('Criar novo item clicado!');
  }

  public updateChecklistItem(checklist: ChecklistItem) {
    console.log('atualizado item do checklist!');
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
        console.log('Janela model confirmar apagar fechada');
      });
  }
}
