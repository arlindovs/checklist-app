import { CategoryService } from './../service/category.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Category } from '../_models/category';
import { SnackBarService } from '../service/snack-bar.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackbarService: SnackBarService
  ) {}

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
    this.closeModalEventEmitter.emit(false);
  }

  /**
   * Salva a categoria editada.
   */
  public save() {

    if(this.categoryForm.valid){

      if(this.actionName == 'Editar'){

        var updatedCategory = {
          guid: this.editableCategory.guid,
          name: this.categoryForm.value['name']
        }

        this.categoryService.updateCategory(updatedCategory).subscribe((resp: any) => {
          this.closeModalEventEmitter.emit(true);
        }, (error: any) => {
          this.snackbarService.showSnackBar('Erro ao alterar a categoria!', 'OK');
        });
      } else {
        this.categoryService.saveCategory(this.categoryForm.value).subscribe((resp: any) => {
          this.closeModalEventEmitter.emit(true);
        }, (error: any) => {
          this.snackbarService.showSnackBar('Erro ao criar a categoria!', 'OK');
        });
      }
    }
  }

  /**
   * Limpa o formulário.
   */
  public clearForm() {
    this.categoryForm.reset();
  }
}
