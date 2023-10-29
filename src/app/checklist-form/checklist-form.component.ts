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
    private categoryService: CategoryService
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

  /**
   * Cria o formulário de edição do item de checklist.
   */
  private createForm() {
    this.checklistForm = this.formBuilder.group({
      complete: [
        this.checklistItem != null ? this.checklistItem.complete : false,
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

  /**
   * Emite o evento de fechamento do formulário com sucesso.
   */
  public save() {
    this.formCloseEvent.emit(true);
  }

  /**
   * Emite o evento de fechamento do formulário sem sucesso.
   */
  public cancel() {
    this.formCloseEvent.emit(false);
  }
}
