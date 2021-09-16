import { Directive } from '@angular/core';
import { MatHeaderCell } from '@angular/material/table';

@Directive({
  selector: 'zyfra-header-cell, th[zyfra-header-cell]',
})
export class ZyfraHeaderCellDirective extends MatHeaderCell {}
