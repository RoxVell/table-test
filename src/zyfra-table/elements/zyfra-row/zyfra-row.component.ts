import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, HostListener, Inject, Input } from '@angular/core';
import { CdkRow } from '@angular/cdk/table';
import { MatRow } from '@angular/material/table';
import { ZyfraTableComponent, NestingNode, isNestingNode } from '../../zyfra-table.component';

@Component({
  selector: 'zyfra-row, tr[zyfra-row]',
  templateUrl: './zyfra-row.component.html',
  styleUrls: ['./zyfra-row.component.css'],
  providers: [{ provide: CdkRow, useExisting: ZyfraRow }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZyfraRow<T> extends MatRow {
  @Input() selected = false;
  @Input('zyfra-row') data: T | NestingNode<T>;

  @HostListener('click', ['$event']) onClick(event: PointerEvent) {
    event.preventDefault();
    if (this.table.selectable) {
      const isMultiSelect = event.shiftKey;

      if (isMultiSelect) {
        console.log({isMultiSelect});

        const activeItemIndex = this.table.getItemIndex(this.table.activeItem);
        const currentItemIndex = this.table.getItemIndex(this.data);

        const start = Math.min(activeItemIndex, currentItemIndex);
        const end = Math.max(activeItemIndex, currentItemIndex) + 1;

        console.log({
          start,
          end
        });

        // document.onselectstart = function() { return false };

        if (this.table.isNodeSelected(this.data)) {
          this.table.unselectItemsByRange(start, end);
        } else {
          this.table.selectItemsByRange(start, end);
        }

        // setTimeout(() => {
        //   // @ts-ignore
        //   document.onselectstart = null;

        // })

      } else {
        this.table.toggleSelection(this.data);
      }

    } else if (isNestingNode(this.data) && this.data.expandable) {
      this.table.toggleExpand(this.data);
    }

    if (isNestingNode(this.data)) {
      this.table.activeItem = this.data.originalNode;
    } else {
      this.table.activeItem = this.data;
    }
  }

  constructor(
    @Inject(ZyfraTableComponent) @Host() public table: ZyfraTableComponent<T>,
    private cdr: ChangeDetectorRef,
  ) {
    super();
    this.table.changeActiveItem.subscribe(() => this.cdr.detectChanges());
  }

  get isActive(): boolean {
    if (isNestingNode(this.data)) {
      return this.table.activeItem === this.data.originalNode;
    } else {
      return this.table.activeItem === this.data;
    }
  }
}
