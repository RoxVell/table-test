import { CdkFooterRow } from '@angular/cdk/table';
import { Component } from '@angular/core';
import { MatFooterRow } from '@angular/material/table';

@Component({
  selector: 'zyfra-footer-row, tr[zyfra-footer-row]',
  templateUrl: './zyfra-footer-row.component.html',
  styleUrls: ['./zyfra-footer-row.component.css'],
  providers: [{ provide: CdkFooterRow, useExisting: ZyfraFooterRow }]
})
export class ZyfraFooterRow extends MatFooterRow {}
