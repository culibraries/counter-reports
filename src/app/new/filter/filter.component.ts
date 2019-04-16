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
import { Filter } from '../../core/models/filter.model';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
  providers: [Filter]
})
export class FilterComponent implements OnInit {
  @ViewChildren('filterItem') filterItem: QueryList<FilterItemComponent>;

  items: number[] = [];
  isShowFilterOption = false;

  filterDisplay = '';
  @Output() applyFilterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  constructor(public dialog: MatDialog, private filter: Filter) {}

  ngOnInit() {
    this.items.push(this.items.length);
    this.filter = new Filter();
  }
  toggleFilterOption() {
    if (this.items.length === 0) {
      this.items.push(this.items.length);
    }
    this.isShowFilterOption = !this.isShowFilterOption;
  }

  resetAll() {
    this.items = [];
    this.items.push(this.items.length);
    this.resetEvent.emit('reset-data');
    this.filterItem.forEach(e => {
      e.resetFilterOption();
    });
  }

  applyFilter() {
    this.filter.reset();
    this.filterItem.forEach(e => {
      if (e.selectedFilter === 'from') {
        this.filter.setFrom(
          e.yearSelected + '-' + e.monthSelected + '-' + '01'
        );
      }
      if (e.selectedFilter === 'to') {
        this.filter.setTo(e.yearSelected + '-' + e.monthSelected + '-' + '01');
      }
      if (e.selectedFilter === 'platform') {
        this.filter.setPlatform(e.filterControl.value);
      }
      if (e.selectedFilter === 'publisher') {
        this.filter.setPublisher(e.filterControl.value);
      }
      if (e.selectedFilter === 'title') {
        this.filter.setTitle(e.filterControl.value);
      }
    });
    this.applyFilterEvent.emit(this.filter.getFilterURL());
  }

  increment() {
    this.items.push(this.items.length);
  }

  decrement(item: number) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    if (this.items.length === 0) {
      this.isShowFilterOption = false;
    }
  }

  openSaveModal() {
    const dialogRef = this.dialog.open(SaveModalBoxComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {});
  }

  receiveMessage($event) {
    this.filterDisplay = $event;
  }
}
