import { CdkHeaderRow } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { MatHeaderRow } from '@angular/material/table';

@Component({
  selector: 'zyfra-header-row, tr[zyfra-header-row]',
  templateUrl: './zyfra-header-row.component.html',
  styleUrls: ['./zyfra-header-row.component.css'],
  providers: [{ provide: CdkHeaderRow, useExisting: ZyfraHeaderRow }]
})
export class ZyfraHeaderRow extends MatHeaderRow {}
