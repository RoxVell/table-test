import { CdkFooterRowDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';
import { MatFooterRowDef } from '@angular/material/table';

@Directive({
  selector: '[zyfraFooterRowDef]',
  inputs: ['columns: zyfraFooterRowDef', 'sticky: zyfraFooterRowDefSticky'],
  providers: [{ provide: CdkFooterRowDef, useExisting: ZyfraFooterRowDef }],
})
export class ZyfraFooterRowDef extends MatFooterRowDef {}
