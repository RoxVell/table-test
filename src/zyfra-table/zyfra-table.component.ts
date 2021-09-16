import { FlatTreeControl } from '@angular/cdk/tree';
import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Host, Input, OnDestroy, OnInit, Optional, Output, QueryList, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ZyfraSort } from './elements/sort/zyfra-sort.directive';
import { ZyfraColumnDef } from './elements/zyfra-column-def.directive';
import { ZyfraFooterRowDef } from './elements/zyfra-footer-row-def.directive';
import { ZyfraHeaderRowDef } from './elements/zyfra-header-row-def.directive';
import { ZyfraRowDef } from './elements/zyfra-row-def.directive';
import { disableShiftTextSelection } from './utils';
import { getTableSelectionService } from './zyfra-table-selection';
import { TableSelectionStrategy } from './zyfra-table-selection/table-selection-strategy';

type Expandable = { expandable: boolean; };
type HasLevel = { level: number; };
type HasOriginalNode<T> = { originalNode: T; };

export type NestingNode<T = unknown> = Expandable & HasLevel & HasOriginalNode<T>;

export function isNestingNode(node: { [key: string]: any }): node is NestingNode {
  return node.expandable !== undefined && node.level !== undefined && node.originalNode !== undefined;
}

export interface ZyfraTableNesting<Node, FlatNode> {
  transformer: (node: Node) => FlatNode & Expandable;
  getChildren: (node: Node) => Node[] | null | undefined;
  expanded?: boolean;
}

type SortFunction<T> = (a: T, b: T, isAscending: boolean) => number;
export type SortRule<T> = Record<string, SortFunction<T>>;

@Component({
  selector: 'zyfra-table',
  templateUrl: './zyfra-table.component.html',
  styleUrls: ['./zyfra-table.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZyfraTableComponent<T> implements OnInit, AfterContentInit, OnDestroy {
  @Input() data: T[];
  @Input() columns: string[] = [];
  @Input() nesting: ZyfraTableNesting<T, unknown>;
  @Input() selectable = false;
  @Input() sortRules: SortRule<T> = {};

  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() expandChange = new EventEmitter<NestingNode<T>[]>();
  @Output() changeActiveItem = new EventEmitter<T>();

  dataSource: MatTableDataSource<T> | MatTreeFlatDataSource<T, unknown>;

  treeControl?: FlatTreeControl<NestingNode<T>>;
  treeFlattener?: MatTreeFlattener<T, NestingNode<T>>;

  selectionService?: TableSelectionStrategy<unknown, T>;

  private _activeItem: T;

  set activeItem(item: T) {
    this._activeItem = item;
    this.changeActiveItem.emit(this._activeItem);
  }

  get activeItem(): T {
    return this._activeItem;
  }

  private destroy$ = new Subject();

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  tableElement = document.querySelector('table');

  @ContentChildren(ZyfraColumnDef) columnDefs: QueryList<ZyfraColumnDef>;
  @ContentChildren(ZyfraHeaderRowDef) headerRowDefs: QueryList<ZyfraHeaderRowDef>;
  @ContentChildren(ZyfraRowDef) rowDefs: QueryList<ZyfraRowDef>;
  @ContentChildren(ZyfraFooterRowDef) footerRowDefs: QueryList<ZyfraFooterRowDef>;

  constructor(
    @Optional() @Host() public sort: ZyfraSort,
  ) {}

  keydown(event: KeyboardEvent) {
    console.log(event);
    if (event.key === 'ArrowUp') {
      const index = this.getItemIndex(this.activeItem);
      const newActiveItem = this.getItemByIndex(index - 1);
      if (newActiveItem) this.activeItem = newActiveItem;
    } else if (event.key === 'ArrowDown') {
      const index = this.getItemIndex(this.activeItem);
      const newActiveItem = this.getItemByIndex(index + 1);
      if (newActiveItem) this.activeItem = newActiveItem;
    }
    
    console.log(this.dataSource);
  }

  ngOnInit() {
    if (this.nesting) {
      this.initNesting();
    }

    if (!this.dataSource) {
      this.dataSource = new MatTableDataSource(this.data);
    }

    if (this.sort) {
      this.initSorting();
    }

    if (this.selectable) {
      this.initSelection();
    }
  }

  private initNesting() {
    this.treeControl = new FlatTreeControl(
      node => node.level,
      node => node.expandable
    );

    this.treeControl?.expansionModel.changed
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.expandChange.emit(data.source.selected);
      });

    this.treeFlattener = new MatTreeFlattener(
      (node: T, level: number) => ({
        ...this.nesting.transformer(node),
        originalNode: node,
        level,
      }),
      node => node.level,
      node => node.expandable,
      (node) => this.nesting.getChildren(node)
    );

    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = this.data;

    if (this.nesting.expanded) {
      this.toggleExpandAll();
    }
  }

  private initSorting() {
    if (this.dataSource instanceof MatTableDataSource) {
      this.dataSource.sort = this.sort;
    } else {
      const isCustomSortDefined = this.sort.zyfraSortChange.observers.length !== 0;
    
      if (!isCustomSortDefined) {
        console.warn(`Sort function is not provided`);
    
        this.sort.zyfraSortChange
          .pipe(takeUntil(this.destroy$))
          .subscribe(sortEvent => {
            const data = [...this.data];
    
            const isAsc = sortEvent.direction === 'asc';
    
            if (!sortEvent.column || sortEvent.direction === '') {
              this.setData(data);
              return;
            }
    
            const sortFunction: SortFunction<T> | undefined = this.sortRules[sortEvent.column];
    
            if (!sortFunction) {
              console.warn(`Правило сортировки для колонки '${sortEvent.column}' не найдено`);
            }
    
            const sort = (data: T[]) => {
              let copy = [...data];
        
              if (typeof sortFunction === 'function') {
                copy = copy.sort((a, b) => this.sortRules[sortEvent.column](a, b, isAsc));
              }
        
              for (let child of copy) {
                const children = this.nesting.getChildren(child);
                
                if (children) {
                  sort(children);
                }
              }
        
              return copy;
            }
        
            this.setData(sort(data));
          });
      }
    }
  }

  private initSelection() {
    this.selectionService = getTableSelectionService((this.dataSource as MatTableDataSource<T>), this.treeControl);
    this.selectionService.selectionChanged
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => this.selectionChange.emit(data));

    const enableShiftTextSelection = disableShiftTextSelection();

    
  }

  isAllSelected() {
    return this.selectionService?.isAllSelected();
  }

  toggleSelection(node: NestingNode<T> | T) {
    this.selectionService?.toggleSelection(node);
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      return this.selectionService?.unselectAll();
    } else {
      return this.selectionService?.selectAll();
    }
  }

  selectItemsByRange(startIndex: number, finishIndex: number) {
    this.dataSource.data
      .slice(startIndex, finishIndex)
      .forEach(item => {
        if (!this.isNodeSelected(item)) {
          this.toggleSelection(item);
        }
      });
  }

  unselectItemsByRange(startIndex: number, finishIndex: number) {
    const slice = this.dataSource.data.slice(startIndex, finishIndex);

    slice.forEach(item => {
      if (this.isNodeSelected(item)) {
        this.toggleSelection(item);
      }
    })
  }

  getItemIndex(item: T | NestingNode<T>) {
    if (isNestingNode(item)) {
      return this.dataSource.data.indexOf(item.originalNode);
    } else {
      return this.dataSource.data.indexOf(item);
    }
  }

  getItemByIndex(index: number): T | undefined {
    return this.dataSource.data.find((_, i) => index === i);
  }

  isNodeSelected(node: NestingNode<T> | T): boolean {
    return this.selectionService?.isNodeSelected(node) || false;
  }

  ngAfterContentInit() {
    this.headerRowDefs.forEach(headerRowDef => this.addHeaderRowDef(headerRowDef));
    this.columnDefs.forEach(columnDef => this.addColumnDef(columnDef));
    this.rowDefs.forEach(rowDef => this.addRowDef(rowDef));
    this.footerRowDefs.forEach(footerRowDef => this.addFooterRowDef(footerRowDef));
  }

  addHeaderRowDef(headerRowDef: ZyfraHeaderRowDef) {
    this.table.addHeaderRowDef(headerRowDef);
  }

  addColumnDef(columnDef: ZyfraColumnDef) {
    this.table.addColumnDef(columnDef);
  }

  addRowDef(rowDef: ZyfraRowDef) {
    this.table.addRowDef(rowDef);
  }

  addFooterRowDef(footerRowDef: ZyfraFooterRowDef) {
    this.table.addFooterRowDef(footerRowDef);
  }

  isExpanded(data: NestingNode<T>) {
    return this.treeControl?.isExpanded(data);
  }

  isAllExpanded() {
    return this.treeControl?.dataNodes.every((node) => !node.expandable || this.isExpanded(node));
  }

  toggleExpand(data: NestingNode<T>) {
    return this.treeControl?.toggle(data);
  }

  toggleExpandAll() {
    if (this.isAllExpanded()) {
      this.treeControl?.collapseAll();
    } else {
      this.treeControl?.expandAll();
    }
  }

  setData(data: T[]) {
    if (this.dataSource instanceof MatTableDataSource) {
      this.dataSource.data = data;
    } else {
      const expandedNodes = this.getExpandedNodes();
      this.dataSource.data = data;
      this.restoreExpandedNodes(expandedNodes);
    }
  }

  private getExpandedNodes() {
    return this.treeControl?.dataNodes.filter(node => node.expandable && this.treeControl?.isExpanded(node)) || [];
  }

  private restoreExpandedNodes(expandedNodes: any[]) {
    expandedNodes.forEach(node => {
      const target = this.treeControl?.dataNodes.find((n: any) => n.name === node.name);

      if (target) {
        this.treeControl?.expand(target);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
