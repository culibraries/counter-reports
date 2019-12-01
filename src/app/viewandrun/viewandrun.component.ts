import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {
  FilterRecordService,
  FilterRecord,
  AuthService,
  Filter,
  AlertService,
} from '../core';
import { MatDialog } from '@angular/material';
import { SaveModalBoxComponent, ConfirmComponent } from '../shared';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'app-viewandrun',
  templateUrl: './viewandrun.component.html',
  styleUrls: ['./viewandrun.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
    ]),
  ],
})
export class ViewandrunComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'owner',
    'created_at',
    'updated_at',
    'actions',
  ];
  dataSource = new MatTableDataSource([]);
  filterRecord: FilterRecord[];
  isBelongsToMe: boolean;
  filter = new Filter();
  expandedElement: [] | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    private filterRecordService: FilterRecordService,
    private auth: AuthService,
    private alert: AlertService
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

  onDelete(event: any, id: number) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterRecordService.delete(id).subscribe(result => {
          this.loadAllFiltersRecord();
        });
        this.alert.success('All right ! The record has been deleted');
      }
    });
  }

  onEdit(event: any, id: number) {
    event.stopPropagation();
    this.filterRecordService.getById(id).subscribe(res => {
      const dialogRef = this.dialog.open(SaveModalBoxComponent, {
        width: '500px',
        height: 'auto',
        data: { action: 'edit', filterRecord: res },
      });

      dialogRef.afterClosed().subscribe(res => {
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
