import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../_models/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  @Input() public actionName = 'Editar Categoria';
  public categoryForm!: FormGroup;

  @Output() public closeModalEventEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Input() public editableCategory!: Category;

  public isFormReady = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [
        this.editableCategory != null ? this.editableCategory.name : '',
        Validators.required,
      ],
    });
    this.isFormReady = true;
  }

  public cancel() {
    console.log('Cancelar Clicado!');
    this.closeModalEventEmitter.emit(false);
  }

  public save() {
    console.log('Salvar Clicado!');
    this.closeModalEventEmitter.emit(true);
  }
}
