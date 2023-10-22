import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryComponent } from './category/category.component';
import { ChecklistComponent } from './checklist/checklist.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'categoria', component: CategoryComponent},
  {path: 'checklist', component: ChecklistComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
