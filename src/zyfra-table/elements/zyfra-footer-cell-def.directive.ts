import { CdkFooterCellDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';
import { MatFooterCellDef } from '@angular/material/table';

@Directive({
  selector: '[zyfraFooterCellDef]',
  providers: [{ provide: CdkFooterCellDef, useExisting: ZyfraFooterCellDef }]
})
export class ZyfraFooterCellDef extends MatFooterCellDef {}
