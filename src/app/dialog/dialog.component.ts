import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){
      if(data.dialogMsg != null){
        this.dialogMsg = data.dialogMsg
      }

      if(data.leftButtonLabel != null){
        this.leftButtonLabel = data.leftButtonLabel
      }

      if(data.rightButtonLabel != null){
        this.rightButtonLabel = data.rightButtonLabel
      }
    }

  public dialogMsg = 'Deseja continuar?';
  public leftButtonLabel = 'Cancelar';
  public rightButtonLabel = 'OK';

  ngOnInit(): void {
  }

  public clickLeftButton(){
    this.dialogRef.close(false);
  }

  public clickRightButton(){
    this.dialogRef.close(true);
  }

}
