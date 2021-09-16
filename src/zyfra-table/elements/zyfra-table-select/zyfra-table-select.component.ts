import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, Inject, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NestingNode, ZyfraTableComponent } from '../../zyfra-table.component';

@Component({
  selector: 'zyfra-table-select',
  templateUrl: './zyfra-table-select.component.html',
  styleUrls: ['./zyfra-table-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZyfraTableSelect<T> implements OnDestroy {
  @Input() data: NestingNode<T>;
  @Input() all = false;

  private selectionSubscription: Subscription;

  constructor(
    @Inject(ZyfraTableComponent) @Host() public table: ZyfraTableComponent<T>,
    private cdr: ChangeDetectorRef,
  ) {
    this.selectionSubscription = this.table.selectionChange.subscribe(() => this.cdr.markForCheck());
  }

  isSelected(data: NestingNode<T>) {
    if (this.all) {
      return this.table.isAllSelected();
    } else {
      return this.table.isNodeSelected(data)
    }
  }

  selectChange(event: Event) {
    if (this.all) {
      event.stopPropagation();
      this.table.toggleSelectAll();
    }
  }

  ngOnDestroy() {
    this.selectionSubscription.unsubscribe();
  }
}
