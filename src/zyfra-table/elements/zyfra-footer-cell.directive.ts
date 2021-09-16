import { Directive } from '@angular/core';
import { MatFooterCell } from '@angular/material/table';

@Directive({
  selector: 'zyfra-footer-cell, td[zyfra-footer-cell]'
})
export class ZyfraFooterCell extends MatFooterCell {}
