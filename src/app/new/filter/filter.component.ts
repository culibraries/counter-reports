import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SaveModalBoxComponent } from '../save-modal-box/save-modal-box.component';
import { FilterItemComponent } from '../filter-item/filter-item.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @ViewChild('filterItem')
  private filterItem: FilterItemComponent;

  items: number[] = [];
  isShowFilterOption = false;

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

  resetFilterOption() {
    this.items = [];
    this.items.push(this.items.length);
    this.filterItem.resetFilterOption();
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

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
