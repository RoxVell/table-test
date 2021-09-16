import { Directive } from '@angular/core';
import { MatCell } from '@angular/material/table';

@Directive({
  selector: 'zyfra-cell, td[zyfra-cell]'
})
export class ZyfraCell extends MatCell {}
