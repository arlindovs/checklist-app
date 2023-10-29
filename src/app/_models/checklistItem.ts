import { Category } from './category';

export class ChecklistItem {
  public complete!: boolean;
  public description!: string;
  public dateEnd!: Date;
  public datePost!: Date;
  public category!: Category;
  public guid!: string;
}
