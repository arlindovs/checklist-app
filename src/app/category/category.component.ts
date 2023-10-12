import { Component, OnInit } from '@angular/core';
import { CATEGORY_DATA, Category } from '../_models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'actions'];
  public dataSource: Category[] = CATEGORY_DATA;

  constructor(){ }

  ngOnInit(): void {
  }

  public editCategory(category: Category){
    console.log('Cliquei em Editar!');
  }

  public deleteCategory(category: Category){
    console.log('Cliquei em Deletar!');
  }

  public createNewCategory(){
    console.log('Cliquei em Novo!');
  }

}
