import { SnackBarService } from './../service/snack-bar.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormGroupDirective,
} from '@angular/forms';
import { ChecklistItem } from './../_models/checklistItem';
import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Category } from '../_models/category';
import { CategoryService } from '../service/category.service';
import { ChecklistService } from '../service/checklist.service';

/**
 * Componente responsável por exibir e gerenciar o formulário de edição de um item de checklist.
 */
@Component({
  selector: 'app-checklist-form',
  templateUrl: './checklist-form.component.html',
  styleUrls: ['./checklist-form.component.css'],
})
export class ChecklistFormComponent implements OnInit {
  /**
   * Nome da ação que será exibido no botão de salvar.
   */
  @Input() public actionName = 'Editar';

  /**
   * Item de checklist que será editado.
   */
  @Input() public checklistItem!: ChecklistItem;

  /**
   * Evento emitido quando o formulário é fechado.
   */
  @Output() public formCloseEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /**
   * Diretiva do formulário.
   */
  @ViewChild(FormGroupDirective) checklistFormDirective!: FormGroupDirective;

  /**
   * Lista de categorias disponíveis.
   */
  public categories: Category[] = [];

  /**
   * Formulário de edição do item de checklist.
   */
  public checklistForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private checklistService: ChecklistService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    /**
     * Busca todas as categorias disponíveis e cria o formulário.
     */
    this.categoryService.getAllCaregories().subscribe((resp: Category[]) => {
      this.categories = resp;
      this.createForm();
    });
  }

  public compareCategories(categoryOne: Category, categoryTwo: Category): boolean{
    return (categoryOne != null && categoryTwo != null) &&
    (categoryOne.guid == categoryTwo.guid) &&
    (categoryOne.name == categoryTwo.name);
  }

  /**
   * Cria o formulário de edição do item de checklist.
   */
  private createForm() {
    this.checklistForm = this.formBuilder.group({
      isCompleted: [
        this.checklistItem != null ? this.checklistItem.isCompleted : false,
        Validators.required,
      ],
      description: [
        this.checklistItem != null ? this.checklistItem.description : '',
        Validators.required,
      ],
      dateEnd: [
        this.checklistItem != null
          ? new Date(this.checklistItem.dateEnd)
          : new Date(),
        Validators.required,
      ],
      category: [
        this.checklistItem != null ? this.checklistItem.category : null,
        Validators.required,
      ],
    });
  }

  public clearForm() {
    this.checklistForm.reset();
  }

  /**
   * Emite o evento de fechamento do formulário com sucesso.
   */
  public save() {
    if(this.checklistForm.valid){
      if(this.actionName == 'Editar'){

        var updateableItem = {
          guid: this.checklistItem.guid,
          description: this.checklistForm.value['description'],
          isCompleted: this.checklistForm.value['isCompleted'],
          dateEnd: this.checklistForm.value['dateEnd'],
          category: this.checklistForm.value['category'],
          datePost: this.checklistItem.datePost

        }

        this.checklistService.updateChecklistItem(updateableItem).subscribe(
          (resp: any) => {
            this.formCloseEvent.emit(true);
          },(error: any) => {
            this.snackBarService.showSnackBar('Erro ao atualizar item!', 'OK');
          }
        )
    } else {
      this.checklistService.saveChecklistItem(this.checklistForm.value).subscribe(
        (resp: any) => {
          this.snackBarService.showSnackBar('Item salvo com sucesso!', 'OK');
          this.formCloseEvent.emit(true);
        },(error: any) => {
          this.snackBarService.showSnackBar('Erro ao salvar item!', 'OK');
        }
      )
    }

    this.formCloseEvent.emit(true);
  } else {
    console.log('Formulário inválido');
  }
}

  /**
   * Emite o evento de fechamento do formulário sem sucesso.
   */
  public cancel() {
    this.formCloseEvent.emit(false);
  }
}
