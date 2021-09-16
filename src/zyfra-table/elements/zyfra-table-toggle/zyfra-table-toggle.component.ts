import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Host, Inject, Input, Output } from '@angular/core';
import { NestingNode, ZyfraTableComponent } from '../../zyfra-table.component';

@Component({
  selector: 'zyfra-table-toggle, td[zyfra-table-toggle]',
  templateUrl: './zyfra-table-toggle.component.html',
  styleUrls: ['./zyfra-table-toggle.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ZyfraTableToggleComponent<T> {
  @Input('zyfra-table-toggle') data: NestingNode<T>;
  @Input() all = false;

  @Output() toggle = new EventEmitter<Event>();

  constructor(
    @Inject(ZyfraTableComponent) @Host() public table: ZyfraTableComponent<T>,
    private cdr: ChangeDetectorRef,
  ) {
    if (!this.table) {
      throw new Error(`ZyfraTable is not the parent of ZyfraTableToggle`);
    }

    this.table.expandChange.subscribe(() => this.cdr.markForCheck());
  }

  toggleExpand(event: Event) {
    if (this.all) {
      event.stopPropagation();
      this.table.toggleExpandAll();
    } else {
      this.table.toggleExpand(this.data);
      this.toggle.emit(event);
    }
  }

  isExpanded() {
    return this.all ? this.table.isAllExpanded() : this.table.isExpanded(this.data);
  }
}
