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
import { AlertService } from '../../core';
import { Filter } from '../../core/models/filter.model';
import { MatSnackBar } from '@angular/material';

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
  duration = 4000;
  @Output() applyFilterEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private filter: Filter,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.items.push(this.items.length);
    this.filter = new Filter();
  }
  toggleFilterOption() {
    if (this.items.length === 0) {
      this.items.push(this.items.length);
    }
    this.isShowFilterOption = !this.isShowFilterOption;

    if (this.isShowFilterOption) {
      this.filterDisplay = '';
    } else {
      this.filterDisplay = '';
    }
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
    let flag = 1;
    let fromCount = 0;
    let toCount = 0;
    let fromDate: Date;
    let toDate: Date;
    this.filterItem.forEach(e => {
      if (e.selectedFilter === 'from') {
        fromCount++;
        if (fromCount === 2) {
          this.alertService.error('A From field has been already selected.');
          flag = 0;
        }
        if (!e.yearSelected || !e.monthSelected) {
          this.snackBar.open('(*) From : MM/YYYY is required', '', {
            duration: this.duration,
            panelClass: ['alert-danger']
          });

          flag = 0;
        } else {
          fromDate = new Date(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );
          this.filter.setFrom(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );
        }
      }

      if (e.selectedFilter === 'to') {
        toCount++;
        if (toCount === 2) {
          this.snackBar.open('(*) A To field has been already selected', '', {
            duration: this.duration,
            panelClass: ['alert-danger']
          });
          flag = 0;
        }
        if (!e.yearSelected || !e.monthSelected) {
          this.snackBar.open('(*) To: MM/YYYY is required', '', {
            duration: this.duration,
            panelClass: ['alert-danger']
          });
          flag = 0;
        } else {
          toDate = new Date(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );

          this.filter.setTo(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );
        }
      }

      if (fromDate && toDate) {
        if (toDate < fromDate) {
          this.snackBar.open('(*) No way !', '', {
            duration: this.duration,
            panelClass: ['alert-danger']
          });
          flag = 0;
        }
      }

      if (!fromDate && toDate) {
        this.snackBar.open('(*) From : is required', '', {
          duration: this.duration,
          panelClass: ['alert-danger']
        });
        flag = 0;
      }

      if (e.selectedFilter === 'platform') {
        if (!e.filterControl.value) {
          this.snackBar.open('(*) Platform: Platform name is required', '', {
            duration: this.duration,
            panelClass: ['alert-danger']
          });
          flag = 0;
        } else {
          this.filter.setPlatform(e.filterControl.value);
        }
      }
      if (e.selectedFilter === 'publisher') {
        if (!e.filterControl.value) {
          this.snackBar.open('(*) Publisher: Publisher name is required', '', {
            duration: this.duration,
            panelClass: ['alert-danger']
          });
          flag = 0;
        } else {
          this.filter.setPublisher(e.filterControl.value);
        }
      }
      if (e.selectedFilter === 'title') {
        if (!e.filterControl.value) {
          this.snackBar.open('(*) Title: Title name is required', '', {
            duration: this.duration,
            panelClass: ['alert-danger']
          });

          flag = 0;
        } else {
          this.filter.setTitle(e.filterControl.value);
        }
      }
    });
    if (flag) {
      this.applyFilterEvent.emit(this.filter.getFilterURL());
    } else {
      return;
    }
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
