import { FlatTreeControl } from "@angular/cdk/tree";
import { MatTableDataSource } from "@angular/material/table";
import { NestingNode } from "../zyfra-table.component";
import { NestedTableSelectionStrategy } from "./nested-table-selection-strategy";
import { SimpleTableSelectionStrategy } from "./simple-table-selection-strategy";

export function getTableSelectionService<T>(dataSource: MatTableDataSource<T>, treeControl?: FlatTreeControl<NestingNode<T>>) {
  if (treeControl) {
    return new NestedTableSelectionStrategy<T>(treeControl);
  } else {
    return new SimpleTableSelectionStrategy<T>(dataSource);
  }
}
