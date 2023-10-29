import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  /**
   * Construtor da classe DialogComponent.
   * @param dialogRef Referência para o componente MatDialogRef.
   * @param data Dados que serão exibidos no diálogo.
   */
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.dialogMsg != null) {
      this.dialogMsg = data.dialogMsg;
    }

    if (data.leftButtonLabel != null) {
      this.leftButtonLabel = data.leftButtonLabel;
    }

    if (data.rightButtonLabel != null) {
      this.rightButtonLabel = data.rightButtonLabel;
    }
  }

  /**
   * Mensagem exibida no diálogo.
   */
  public dialogMsg = 'Deseja continuar?';

  /**
   * Texto exibido no botão esquerdo do diálogo.
   */
  public leftButtonLabel = 'Cancelar';

  /**
   * Texto exibido no botão direito do diálogo.
   */
  public rightButtonLabel = 'OK';

  ngOnInit(): void {}

  /**
   * Método chamado quando o botão esquerdo é clicado.
   * Fecha o diálogo com o valor false.
   */
  public clickLeftButton() {
    this.dialogRef.close(false);
  }

  /**
   * Método chamado quando o botão direito é clicado.
   * Fecha o diálogo com o valor true.
   */
  public clickRightButton() {
    this.dialogRef.close(true);
  }
}
