import { SelectionModel } from '@angular/cdk/collections';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class TableSelectionStrategy<T, K = T> {
  checklistSelection = new SelectionModel<K>(true);
  selectionChanged = new EventEmitter<K[]>();

  isNodeSelected(node: T): boolean {
    throw new Error('Method not implemented');
  }

  toggleSelection(node: T): void {
    throw new Error('Method not implemented');
  }

  isAllSelected(): boolean {
    throw new Error('Method not implemented');
  }

  selectAll(): void {
    throw new Error('Method not implemented');
  }

  unselectAll(): void {
    this.checklistSelection.clear();
    this.notifySelectionChange();
  }

  notifySelectionChange(): void {
    this.selectionChanged.emit(this.checklistSelection.selected);
  }
}
