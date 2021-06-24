import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SaveModalBoxComponent } from '../../shared';
import { FilterItemComponent } from '../filter-item/filter-item.component';
import {
  Filter,
  ValidatorService,
  FilterRecordService,
  FilterRecord,
} from '../../core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [Filter],
})
export class FilterComponent implements OnInit {
  @ViewChildren('filterItemList')
  filterItemList: QueryList<FilterItemComponent>;

  filterItems = [];
  isShowFilterOption = false;

  filterDisplay = '';
  isBrandNewSaveFilter = true;
  filterRecord: FilterRecord;
  @Output() applyFilterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  filter: Filter;

  arrayFilterItemList = [];

  constructor(
    public dialog: MatDialog,
    private validator: ValidatorService,
    private route: ActivatedRoute,
    private filterRecordService: FilterRecordService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((paramsResponse: Params) => {
      if (!paramsResponse.hasOwnProperty('params')) {
        return;
      }

      this.isBrandNewSaveFilter = false;

      // Initilize filterObject
      const filterObject = new Filter().getFilterObject(paramsResponse.params);

      // Display Filter Title
      this.filterDisplay = filterObject.getString();

      // Display Filter Panel
      this.isShowFilterOption = true;

      filterObject.toJson().forEach((e, i) => {
        this.filterItems[i] = e;
      });

      setTimeout(() => {
        this.applyFilterEvent.emit(filterObject.getFilterURL());
      }, 500);

      this.filterRecordService.getById(paramsResponse.id).subscribe(result => {
        this.filterRecord = result;
      });
    });
  }

  toggleFilterOption() {
    if (this.filterItems.length === 0) {
      this.filterItems.push([]);
    }

    this.isShowFilterOption = !this.isShowFilterOption;

    if (this.filterItemList) {
      this.arrayFilterItemList = this.convertToArrayFilterItemList(
        this.filterItemList
      );
    }
    const filter: Filter = this.convertToFilterObject(this.arrayFilterItemList);

    /* Display filter title if the panel filter option close */
    this.filterDisplay = this.isShowFilterOption ? '' : filter.getString();
  }

  resetAll() {
    /* Reset the filterItems */
    this.filterItems = []; // Clear all
    this.filterItems.push([]); // Initnilize an empty filterItem
    this.filterDisplay = '';
    /* Sent resetEvent to data-list.componet to reset all data in the table */
    this.resetEvent.emit();
  }

  applyFilter(): boolean {
    // Convert FilterItemComponent to readable filter items array before processing
    if (this.filterItemList) {
      this.arrayFilterItemList = this.convertToArrayFilterItemList(
        this.filterItemList
      );
    }

    if (this.validator.validateFilters(this.filterItemList)) {
      const filter: Filter = this.convertToFilterObject(
        this.arrayFilterItemList
      );
      this.filterDisplay = filter.getString();
      this.applyFilterEvent.emit(filter.getFilterURL());
      return true;
    } else {
      return false;
    }
  }

  onIncrementFilterItem() {
    // Add placeholder empty {} to the filter item list
    this.filterItems.push([]);
  }

  onDecrementFilterItem(item: []) {
    // Get current index of filter item
    const index = this.filterItems.indexOf(item);

    // Remove selected filter item from the list
    this.filterItems.splice(index, 1);

    // Clear all when ther is no filter
    if (this.filterItems.length === 0) {
      this.isShowFilterOption = false;
      this.resetAll();
    }
  }

  openSaveModal() {
    // Convert FilterItemComponent to readable filter items array to process
    if (this.filterItemList) {
      this.arrayFilterItemList = this.convertToArrayFilterItemList(
        this.filterItemList
      );
    }

    // Validate all filters before saving
    if (this.validator.validateFilters(this.arrayFilterItemList)) {
      const filter: Filter = this.convertToFilterObject(
        this.arrayFilterItemList
      );

      this.dialog.open(SaveModalBoxComponent, {
        width: '500px',
        height: 'auto',
        data: {
          action: 'save',
          isBrandNewSaveFilter: this.isBrandNewSaveFilter,
          filterDisplay: filter.getString(),
          filterParams: filter.getFilterURL(),
          filterRecord: this.filterRecord ? this.filterRecord : '',
        },
      });
    } else {
      return;
    }
  }

  private convertToFilterObject(filterItemList: any): Filter {
    const filter = new Filter();
    filterItemList.forEach(e => {
      if (e.selectedFilter === 'from') {
        filter.setFrom(e.yearSelected + '-' + e.monthSelected + '-' + '01');
      }
      if ( e.selectedFilter === 'to')
      {
        filter.setTo(e.yearSelected + '-' + e.monthSelected + '-' + '01');
      }
      if (e.selectedFilter === 'platform') {
        filter.setPlatform(
          e.selectedFilterType + '*.' + e.myGroup.get('keyInput').value
        );
      }
      if (e.selectedFilter === 'publisher') {
        filter.setPublisher(
          e.selectedFilterType + '*.' + e.myGroup.get('keyInput').value
        );
      }
      if (e.selectedFilter === 'title') {
        filter.setTitle(
          e.selectedFilterType + '*.' + e.myGroup.get('keyInput').value
        );
      }
    });
    return filter;
  }

  private convertToArrayFilterItemList(
    filterItemList: QueryList<FilterItemComponent>
  ): {}[] {
    const output = [];
    filterItemList.forEach(e => {
      output.push(this.reFilterItemList(e));
    });
    return output;
  }

  private reFilterItemList(filterItemList: FilterItemComponent): {} {
    return {
      selectedFilter: filterItemList['selectedFilter']
        ? filterItemList['selectedFilter']
        : '',
      selectedFilterType: filterItemList['selectedFilterType']
        ? filterItemList['selectedFilterType']
        : '',
      selectedFilterValue: filterItemList['selectedFilterValue']
        ? filterItemList['selectedFilterValue']
        : '',
      yearSelected: filterItemList['yearSelected']
        ? filterItemList['yearSelected']
        : '',
      monthSelected: filterItemList['monthSelected']
        ? filterItemList['monthSelected']
        : '',
      myGroup: filterItemList['myGroup']
        ? filterItemList['myGroup']
        : new FormGroup({}),
    };
  }
}
