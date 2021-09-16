import { MatTableDataSource } from "@angular/material/table";
import { TableSelectionStrategy } from "./table-selection-strategy";

export class SimpleTableSelectionStrategy<T> extends TableSelectionStrategy<T> {
  constructor(private dataSource: MatTableDataSource<T>) {
    super();
  }

  isNodeSelected(node: T): boolean {
    return this.checklistSelection.isSelected(node);
  }

  toggleSelection(node: T): void {
    this.checklistSelection.toggle(node);
    this.notifySelectionChange();
  }

  selectAll() {
    this.dataSource.data.forEach(node => !this.isNodeSelected(node) && this.toggleSelection(node));
    this.notifySelectionChange();
  }

  isAllSelected() {
    return this.dataSource.data.length === this.checklistSelection.selected.length;
  }
}
