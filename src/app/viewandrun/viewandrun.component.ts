import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FilterRecordService, FilterRecord } from '../core';
import { MatDialog } from '@angular/material';
import { SaveModalBoxComponent } from '../shared';

@Component({
  selector: 'app-viewandrun',
  templateUrl: './viewandrun.component.html',
  styleUrls: ['./viewandrun.component.css']
})
export class ViewandrunComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'owner',
    'created_at',
    'updated_at',
    'actions'
  ];
  dataSource = new MatTableDataSource([]);
  filterRecord: FilterRecord[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private filterRecordService: FilterRecordService
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadAllFiltersRecord();
  }

  loadAllFiltersRecord() {
    // this.dataSource.data = this.filterRecord;

    this.filterRecordService.getAll().subscribe(result => {
      this.dataSource.data = result;
    });
  }

  delete(id) {
    this.filterRecordService.delete(id).subscribe(result => {
      this.loadAllFiltersRecord();
    });
  }
  edit() {
    const dialogRef = this.dialog.open(SaveModalBoxComponent, {
      width: '500px'
      // data: this.filter
    });

    // dialogRef.afterClosed().subscribe(result => {});
  }
  searchFilterRecord(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
