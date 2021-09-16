import { CdkColumnDef } from '@angular/cdk/table';
import { Directive, Input, OnInit } from '@angular/core';
import { MatColumnDef } from '@angular/material/table';

@Directive({
  selector: '[zyfraColumnDef]',
  inputs: ['sticky'],
  providers: [
    { provide: CdkColumnDef, useExisting: ZyfraColumnDef },
    { provide: 'MAT_SORT_HEADER_COLUMN_DEF', useExisting: ZyfraColumnDef },
  ],
})
export class ZyfraColumnDef extends MatColumnDef implements OnInit {
  @Input() zyfraColumnDef: any;

  ngOnInit() {
    this.name = this.zyfraColumnDef;
  }
}
