import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { state, style, trigger } from '@angular/animations';

import { MonthData, DataHelper } from '../../core';
import {
  AlertService,
  PublicationService,
  ExportExcelService
} from '../../core';
import { Config } from '../../core';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY } from '@angular/cdk/overlay/typings/overlay-directives';
@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' }))
    ])
  ]
})
export class DataListComponent implements OnInit {
  displayedColumns: string[] = [
    'title',
    'publisher',
    'platform',
    'print_issn',
    'online_issn',
    'total'
  ];
  expandedElement: [] | null;

  monthDatas: MonthData[] = [];
  monthData: MonthData = { month: '', total: 0 };
  dataSource = new MatTableDataSource([]);
  disabledExportButton: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private publicationService: PublicationService,
    private alert: AlertService,
    private exportService: ExportExcelService,
    private dataHelper: DataHelper
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.disabledExportButton = true;
  }

  loadDataToTable(filterURL: string) {
    if (filterURL === '') {
      this.alert.default(Config.messages.warningAllRecords);
    } else {
      this.alert.default('loading...');
    }
    this.applyFilterByCallingAPI(filterURL);
  }

  private applyFilterByCallingAPI(filterURL: string) {
    this.publicationService.getByFilters(filterURL).subscribe(result => {
      /* Reformating Data from API*/
      this.dataSource.data = this.dataHelper.convertPublicationData(result);

      this.alert.success(this.dataSource.data.length + ' record(s) has found');

      /* Enable export button */
      if (this.dataSource.data.length > 0) {
        this.disabledExportButton = false;
      } else {
        this.disabledExportButton = true;
      }
    });
  }

  resetDataTable() {
    this.dataSource.data = [];
    this.disabledExportButton = true;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  export() {
    this.dataHelper.trimData(this.dataSource.data);
    this.exportService.exportAsExcelFile(
      this.dataSource.data,
      'Counter_Report_'
    );
  }
}
