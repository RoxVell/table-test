import { CdkHeaderCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';
import { MatHeaderCellDef } from '@angular/material/table';

@Directive({
  selector: '[zyfraHeaderCellDef]',
  providers: [
    { provide: CdkHeaderCellDef, useExisting: ZyfraHeaderCellDef }
  ]
})
export class ZyfraHeaderCellDef extends MatHeaderCellDef {}
