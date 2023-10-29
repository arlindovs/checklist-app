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
  /**
   * Nome da ação que será exibido no botão de salvar.
   */
  @Input() public actionName = 'Editar Categoria';

  /**
   * Formulário de categoria.
   */
  public categoryForm!: FormGroup;

  /**
   * Evento que é emitido quando o modal é fechado.
   */
  @Output() public closeModalEventEmitter: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Categoria que será editada.
   */
  @Input() public editableCategory!: Category;

  /**
   * Indica se o formulário está pronto para ser exibido.
   */
  public isFormReady = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    /**
     * Inicializa o formulário de categoria.
     */
    this.categoryForm = this.formBuilder.group({
      name: [
        this.editableCategory != null ? this.editableCategory.name : '',
        Validators.required,
      ],
    });
    this.isFormReady = true;
  }

  /**
   * Cancela a edição da categoria.
   */
  public cancel() {
    console.log('Cancelar Clicado!');
    this.closeModalEventEmitter.emit(false);
  }

  /**
   * Salva a categoria editada.
   */
  public save() {
    console.log('Salvar Clicado!');
    this.closeModalEventEmitter.emit(true);
  }
}
