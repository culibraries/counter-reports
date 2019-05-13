import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {
  FilterRecordService,
  FilterRecord,
  AuthService,
  Filter
} from '../core';
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
  isBelongsToMe: boolean;
  filter = new Filter();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private filterRecordService: FilterRecordService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadAllFiltersRecord();
  }

  loadAllFiltersRecord() {
    this.filterRecordService.getAll().subscribe(result => {
      result.forEach(e => {
        e['isBelongsToMe'] = this.auth.isUser(e.owner);
        e['filterDisplay'] = this.filter.getFilterObject(e.params).getString();
      });
      this.dataSource.data = result;
    });
  }

  delete(id: number) {
    this.filterRecordService.delete(id).subscribe(result => {
      this.loadAllFiltersRecord();
    });
  }

  edit(id: number) {
    this.filterRecordService.getById(id).subscribe(result => {
      let dialogRef = this.dialog.open(SaveModalBoxComponent, {
        width: '500px',
        height: 'auto',
        data: { action: 'edit', message: result }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.loadAllFiltersRecord();
      });
    });
  }

  searchFilterRecord(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
