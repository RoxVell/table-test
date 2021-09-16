import { FlatTreeControl } from "@angular/cdk/tree";
import { NestingNode } from "../zyfra-table.component";
import { TableSelectionStrategy } from "./table-selection-strategy";

export class NestedTableSelectionStrategy<T> extends TableSelectionStrategy<NestingNode<T>, T> {
  constructor(
    private treeControl: FlatTreeControl<NestingNode<T>>
  ) {
    super();
  }

  selectAll() {
    this.treeControl.dataNodes.forEach(node => {
      const hasRootLevel = this.treeControl.getLevel(node) === 1;
      const isNodeNotSelected = !this.isNodeSelected(node)

      if (hasRootLevel && isNodeNotSelected) {
        this.toggleSelection(node)
      }
    });

    this.notifySelectionChange();
  }

  isAllSelected() {
    return this.treeControl?.dataNodes.length === this.checklistSelection.selected.length;
  }

  isNodeSelected(node: NestingNode<T>): boolean {
    // if (node.expandable) {
    //   return this.descendantsAllSelected(node);
    // } else {
    //   return this.checklistSelection.isSelected(node.originalNode);
    // }
    return this.checklistSelection.isSelected(node.originalNode);
  }

  toggleSelection(node: NestingNode<T>): void {
    if (node.expandable) {
      this.todoItemSelectionToggle(node);
    } else {
      this.todoLeafItemSelectionToggle(node);
    }

    this.notifySelectionChange();
  }

  private getLevel = (node: NestingNode<T>) => node.level;

  private descendantsAllSelected(node: NestingNode<T>): boolean {
    const descendants = this.treeControl.getDescendants(node);

    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child.originalNode);
    });

    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: NestingNode<T>): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child.originalNode));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: NestingNode<T>): void {
    this.checklistSelection.toggle(node.originalNode);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node.originalNode)
      ? this.checklistSelection.select(...descendants.map(d => d.originalNode))
      : this.checklistSelection.deselect(...descendants.map(d => d.originalNode));

    // Force update for the parent
    descendants.forEach(child => this.checklistSelection.isSelected(child.originalNode));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: NestingNode<T>): void {
    this.checklistSelection.toggle(node.originalNode);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: NestingNode<T>): void {
    let parent: NestingNode<T> | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: NestingNode<T>): void {
    const nodeSelected = this.checklistSelection.isSelected(node.originalNode);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.length > 0 && descendants.every(child => {
      return this.checklistSelection.isSelected(child.originalNode);
    });
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node.originalNode);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node.originalNode);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: NestingNode<T>): NestingNode<T> | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }

    return null;
  }
}
