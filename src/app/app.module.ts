import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZyfraTableModule } from 'src/zyfra-table/zyfra-table.module';
import { MatTableModule } from '@angular/material/table';
import { RoutingModule } from './routing.module';
import { BasicPageComponent } from './basic-page/basic-page.component';
import { MatSortModule } from '@angular/material/sort';
import { SelectionPageComponent } from './selection-page/selection-page.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TreePageComponent } from './tree-page/tree-page.component';
import {MatTreeModule} from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MultipleHeaderFooterPageComponent } from './multiple-header-footer-page/multiple-header-footer-page.component';

@NgModule({
  declarations: [		
    AppComponent,
    BasicPageComponent,
    SelectionPageComponent,
    TreePageComponent,
      MultipleHeaderFooterPageComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ZyfraTableModule,
    MatTableModule,
    MatSortModule,
    RoutingModule,
    MatCheckboxModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
