import { CdkCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';
import { MatCellDef } from '@angular/material/table';

@Directive({
  selector: '[zyfraCellDef]',
  providers: [{ provide: CdkCellDef, useExisting: ZyfraCellDef }]
})
export class ZyfraCellDef extends MatCellDef {}
