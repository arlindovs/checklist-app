import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChecklistItem } from './../_models/checklistItem';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css']
})
export class ChecklistFormComponent implements OnInit {

  @Input() public actionName = 'Editar';
  @Input() public checklistItem!: ChecklistItem;
  @Output() public formCloseEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  public checklistForm!: FormGroup;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.checklistForm = this.formBuilder.group(
      {
        complete: [this.checklistItem != null ? this.checklistItem.complete : false, Validators.required],
        description: [this.checklistItem != null ? this.checklistItem.description : '', Validators.required],
        dateEnd: [this.checklistItem != null ? this.checklistItem.dateEnd : new Date(), Validators.required],
        category: [this.checklistItem != null ? this.checklistItem.category : null, Validators.required],
      }
    );
  }

  public onFormClose(){

  }

}
