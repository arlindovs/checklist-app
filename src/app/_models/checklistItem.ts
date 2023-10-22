import { CATEGORY_DATA, Category } from './category';

export class ChecklistItem {
  public complete!: boolean;
  public description!: string;
  public dateEnd!: Date;
  public datePost!: Date;
  public category!: Category;
  public guid!: string;
}

export const CHECKLIST_DATA = [
  {
    complete: true,
    description: 'Ir ao Bar',
    dateEnd: Date.now(),
    datePost: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name == 'Saúde'),
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    complete: false,
    description: 'Aprender Angular',
    dateEnd: Date.now(),
    datePost: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name == 'Educação'),
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    complete: false,
    description: 'Reuniao segunda, to fudido!',
    dateEnd: Date.now(),
    datePost: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name == 'Trabalho'),
    guid: 'aaa-bbb-ccc-dddd',
  },
  {
    complete: false,
    description: 'nao sei o que dizer',
    dateEnd: Date.now(),
    datePost: Date.now(),
    category: CATEGORY_DATA.find((x) => x.name == 'Outros'),
    guid: 'aaa-bbb-ccc-dddd',
  },
];
