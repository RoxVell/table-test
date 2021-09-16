import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';

import { ZyfraTableComponent } from './zyfra-table.component';

import { ZyfraCellDef } from './elements/zyfra-cell-def.directive';
import { MatSortModule } from '@angular/material/sort';
import { ZyfraSort } from './elements/sort/zyfra-sort.directive';
import { ZyfraHeaderRow } from './elements/zyfra-header-row/zyfra-header-row.component';
import { ZyfraRow } from './elements/zyfra-row/zyfra-row.component';
import { ZyfraTableToggleComponent } from './elements/zyfra-table-toggle/zyfra-table-toggle.component';
import { ZyfraSortHeader } from './elements/sort/zyfra-sort-header/zyfra-sort-header.component';
import { ZyfraCell } from './elements/zyfra-cell.directive';
import { ZyfraColumnDef } from './elements/zyfra-column-def.directive';
import { ZyfraHeaderCellDef } from './elements/zyfra-header-cell-def.directive';
import { ZyfraHeaderCellDirective } from './elements/zyfra-header-cell.directive';
import { ZyfraHeaderRowDef } from './elements/zyfra-header-row-def.directive';
import { ZyfraRowDef } from './elements/zyfra-row-def.directive';
import { ZyfraFooterRowDef } from './elements/zyfra-footer-row-def.directive';
import { ZyfraFooterRow } from './elements/zyfra-footer-row/zyfra-footer-row.component';
import { ZyfraFooterCell } from './elements/zyfra-footer-cell.directive';
import { ZyfraFooterCellDef } from './elements/zyfra-footer-cell-def.directive';
import { ZyfraNoDataRow } from './elements/zyfra-no-data-row.directive';
import { ZyfraTableSelect } from './elements/zyfra-table-select/zyfra-table-select.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
  ],
  declarations: [
    ZyfraTableComponent,
    ZyfraRowDef,
    ZyfraColumnDef,
    ZyfraCell,
    ZyfraHeaderCellDirective,
    ZyfraHeaderCellDef,
    ZyfraCellDef,
    ZyfraSort,
    ZyfraSortHeader,
    ZyfraHeaderRow,
    ZyfraHeaderRowDef,
    ZyfraRow,
    ZyfraTableToggleComponent,
    ZyfraFooterRowDef,
    ZyfraFooterRow,
    ZyfraFooterCell,
    ZyfraFooterCellDef,
    ZyfraNoDataRow,
    ZyfraTableSelect,
  ],
  exports: [
    ZyfraTableComponent,
    ZyfraRowDef,
    ZyfraColumnDef,
    ZyfraCell,
    ZyfraHeaderCellDirective,
    ZyfraHeaderCellDef,
    ZyfraCellDef,
    ZyfraSort,
    ZyfraSortHeader,
    ZyfraHeaderRow,
    ZyfraHeaderRowDef,
    ZyfraRow,
    ZyfraTableToggleComponent,
    ZyfraFooterRowDef,
    ZyfraFooterRow,
    ZyfraFooterCell,
    ZyfraFooterCellDef,
    ZyfraNoDataRow,
    ZyfraTableSelect,
  ]
})
export class ZyfraTableModule { }
