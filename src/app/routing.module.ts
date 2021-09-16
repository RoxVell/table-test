import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { MultipleHeaderFooterPageComponent } from './multiple-header-footer-page/multiple-header-footer-page.component';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { TreePageComponent } from './tree-page/tree-page.component';

const routes: Routes = [
  { path: 'basic', component: BasicPageComponent },
  { path: 'selection', component: SelectionPageComponent },
  { path: 'multiple', component: MultipleHeaderFooterPageComponent },
  { path: 'tree', component: TreePageComponent },
  { path: '**', component: BasicPageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
