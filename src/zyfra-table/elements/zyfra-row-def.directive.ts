import { CdkRowDef } from '@angular/cdk/table';
import { Directive } from '@angular/core';
import { MatRowDef } from '@angular/material/table';

@Directive({
  selector: '[zyfraRowDef]',
  providers: [
    { provide: CdkRowDef, useExisting: ZyfraRowDef }
  ],
  inputs: ['columns: zyfraRowDefColumns', 'when: zyfraRowDefWhen'],
})
export class ZyfraRowDef extends MatRowDef<any> {}
