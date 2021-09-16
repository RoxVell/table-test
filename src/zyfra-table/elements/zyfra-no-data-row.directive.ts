import { CdkNoDataRow } from '@angular/cdk/table';
import { Directive } from '@angular/core';
import { MatNoDataRow } from '@angular/material/table';

@Directive({
  selector: 'ng-template[zyfraNoDataRow]',
  providers: [{ provide: CdkNoDataRow, useExisting: ZyfraNoDataRow }],
})
export class ZyfraNoDataRow extends MatNoDataRow {}
