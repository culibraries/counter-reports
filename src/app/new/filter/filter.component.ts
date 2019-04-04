import {
  Component,
  OnInit,
  ViewChild,
  QueryList,
  ViewChildren,
  Output,
  EventEmitter
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { SaveModalBoxComponent } from '../save-modal-box/save-modal-box.component';
import { FilterItemComponent } from '../filter-item/filter-item.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @ViewChildren('filterItem') filterItem: QueryList<FilterItemComponent>;

  items: number[] = [];
  isShowFilterOption = false;

  filterCollection: any[][] = [];
  @Output() applyFilterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.items.push(this.items.length);
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
    this.filterCollection['publisher'] = [];
    this.filterCollection['platform'] = [];
    this.filterCollection['title'] = [];
    let flag = true;
    this.filterItem.forEach(element => {
      if (!element.selectedFilter) {
        flag = false;
      }
    });

    if (!flag) {
      if (
        !confirm(
          'You have not select any filters. ALL publications will be retrived. Are you sure you wanna do it ?'
        )
      ) {
        this.filterCollection = [];
      }
    } else {
      this.filterItem.forEach(element => {
        this.filterCollection[element.selectedFilter].push(
          element.filterControl.value
        );
      });
    }

    console.log(this.filterCollection);
    this.applyFilterEvent.emit(this.filterCollection);
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
}
