import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SortDirection } from '../../interfaces/sort-direction';

export interface ZyfraSortEvent {
  column: string;
  direction: 'asc' | 'desc' | '';
}

@Directive({
  selector: '[zyfraSort]',
  providers: [
    { provide: MatSort, useExisting: ZyfraSort }
  ],
  exportAs: 'zyfraSort'
})
export class ZyfraSort extends MatSort {
  @Input() zyfraSortActive = '';
  @Input() zyfraSortDirection: SortDirection;
  @Input() zyfraSortDisableClear = false;

  @Output() zyfraSortChange = new EventEmitter<ZyfraSortEvent>();

  private destroy$ = new Subject();

  ngOnChanges() {
    super.ngOnChanges();
  }

  ngOnInit() {
    if (typeof this.zyfraSortDisableClear === 'boolean') {
      this.disableClear = this.zyfraSortDisableClear;
    }

    this.sortChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((sort) => {
        this.zyfraSortChange.emit({
          column: sort.active,
          direction: sort.direction
        });
      });

    setTimeout(() => {
      this.sort({
        id: this.zyfraSortActive,
        start: this.zyfraSortDirection,
        disableClear: this.zyfraSortDisableClear
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
