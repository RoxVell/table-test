import { CdkHeaderRowDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';
import { MatHeaderRowDef } from '@angular/material/table';

@Directive({
  selector: '[zyfraHeaderRowDef]',
  inputs: ['columns: zyfraHeaderRowDef', 'sticky: zyfraHeaderRowDefSticky'],
  providers: [{ provide: CdkHeaderRowDef, useExisting: ZyfraHeaderRowDef }],
})
export class ZyfraHeaderRowDef extends MatHeaderRowDef {}
