import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { SaveModalBoxComponent } from '../../shared';
import { FilterItemComponent } from '../filter-item/filter-item.component';
import {
  Filter,
  ValidatorService,
  FilterRecordService,
  FilterRecord
} from '../../core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [Filter]
})
export class FilterComponent implements OnInit {
  @ViewChildren('filterItem') filterItem: QueryList<FilterItemComponent>;

  filterItems = [];
  isShowFilterOption = false;

  filterDisplay = '';
  params: boolean = false;
  filterRecord: FilterRecord;
  @Output() applyFilterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private filter: Filter,
    private validator: ValidatorService,
    private route: ActivatedRoute,
    private filterRecordService: FilterRecordService
  ) {
    this.route.params.subscribe(params => {
      if (!this.isEmpty(params)) {
        this.params = true;
        const newFilter = new Filter();
        const filterObject = newFilter.getFilterObject(params.params);
        console.log(filterObject);
        this.filterDisplay = filterObject.getString();
        this.isShowFilterOption = true;
        this.filterItems.length = filterObject.countItem();
        filterObject.toJson().forEach((element, i) => {
          this.filterItems[i] = element;
        });

        setTimeout(() => {
          this.applyFilterEvent.emit(filterObject.getFilterURL());
        }, 500);

        this.filterRecordService.getById(params.id).subscribe(result => {
          this.filterRecord = result;
        });
      }
    });
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  ngOnInit() {}

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

  applyFilter(): boolean {
    /* Initialize new filter object */
    this.filter = new Filter();
    if (this.validator.validateFilters(this.filterItem, this.filter)) {
      /* Only apply filter when it passes the validation */
      this.applyFilterEvent.emit(this.filter.getFilterURL());
      return true;
    } else {
      return false;
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
    this.filter = new Filter();
    if (this.validator.validateFilters(this.filterItem, this.filter)) {
      this.dialog.open(SaveModalBoxComponent, {
        width: '500px',
        height: 'auto',
        data: {
          action: 'create',
          params: this.params,
          message: this.filter,
          message2: this.filterRecord
        }
      });
    } else {
      return;
    }
  }
}
