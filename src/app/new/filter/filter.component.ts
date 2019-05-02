import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { SaveModalBoxComponent } from '../save-modal-box/save-modal-box.component';
import { FilterItemComponent } from '../filter-item/filter-item.component';
import { AlertService, Filter, ValidatorService } from '../../core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [Filter]
})
export class FilterComponent implements OnInit {
  @ViewChildren('filterItem') filterItem: QueryList<FilterItemComponent>;

  filterItems: number[] = [];
  isShowFilterOption = false;

  filterDisplay = '';

  @Output() applyFilterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private filter: Filter,
    private validator: ValidatorService
  ) {}

  ngOnInit() {
    this.filterItems.push(this.filterItems.length);
  }

  toggleFilterOption() {
    if (this.filterItems.length === 0) {
      this.filterItems.push(this.filterItems.length);
    }
    this.isShowFilterOption = !this.isShowFilterOption;

    /* Display filter string if the panel filter option close */
    if (this.isShowFilterOption) {
      this.filterDisplay = '';
    } else {
      this.filterDisplay = this.filter.getString();
    }
  }

  resetAll() {
    /* Reset the filters */
    this.filterItems = [];
    this.filterItems.push(this.filterItems.length);
    this.filter.reset();

    /* Reset filter value */
    this.filterItem.forEach(e => {
      e.resetFilterOption();
      e.monthSelected = '';
      e.yearSelected = '';
    });

    /* Sent resetEvent to data-list.componet to reset data in the table */
    this.resetEvent.emit();
  }

  applyFilter() {
    /* Initialize new filter object */
    this.filter = new Filter();

    if (this.validator.validateFilters(this.filterItem, this.filter)) {
      /* Only apply filter when it passes the validation */
      this.applyFilterEvent.emit(this.filter.getFilterURL());
    } else {
      return;
    }
  }

  increment() {
    this.filterItems.push(this.filterItems.length);
  }

  decrement(item: number) {
    const index = this.filterItems.indexOf(item);
    this.filterItems.splice(index, 1);
    if (this.filterItems.length === 0) {
      this.isShowFilterOption = false;
      this.resetAll();
    }
  }

  openSaveModal() {
    const dialogRef = this.dialog.open(SaveModalBoxComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }
}
