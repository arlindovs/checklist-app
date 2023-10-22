import { Component, OnInit } from '@angular/core';
import { CHECKLIST_DATA, ChecklistItem } from '../_models/checklistItem';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.css']
})
export class ChecklistComponent implements OnInit {
  public displayedColumns: string[] = [
    'id',
    'complete',
    'description',
    'dateEnd',
    'datePost',
    'category',
    'actions'];

    public dataSource = CHECKLIST_DATA;

    constructor(){
    }


  ngOnInit(): void {
  }

  public createNewItem(){
    console.log('Criar nvo item clicado!');
  }

}
