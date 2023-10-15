import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css'],
})
export class CategoryFormComponent implements OnInit {
  public actionName = 'Editar Categoria';

  public categoryForm: FormGroup;
  public name: FormControl = new FormControl('');

  constructor(private formBuilder: FormBuilder) {
    this.categoryForm = this.formBuilder.group({
      name: '',
    });
  }

  ngOnInit(): void {}

  public cancel() {
    console.log('Cancelar Clicado!');
  }

  public save() {
    console.log('Salvar Clicado!');
  }
}
