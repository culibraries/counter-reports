import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { state, style, trigger } from '@angular/animations';

import { MonthData, DataHelper } from '../../core';
import {
  AlertService,
  PublicationService,
  ExportExcelService,
} from '../../core';
import { Config } from '../../core';

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
      state('expanded', style({ height: '*' })),
    ]),
  ],
})
export class DataListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'title',
    'publisher',
    'platform',
    'print_issn',
    'online_issn',
    'effective_dates',
    'total',
  ];
  expandedElement: [] | null;
  data: any;
  monthDatas: MonthData[] = [];
  monthData: MonthData = { month: '', total: 0 };
  dataSource = new MatTableDataSource([]);
  disabledExportButton: boolean;
  getResultSubscriber: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
      this.alert.loading('loading...');
    }
    this.applyFilterByCallingAPI(filterURL);
  }

  private applyFilterByCallingAPI(filterURL: string) {
    let output = [];
    this.resetDataTable();

    if (this.getResultSubscriber) {
      this.getResultSubscriber.unsubscribe();
    }
    this.getResultSubscriber = this.publicationService
      .getByPageNext(filterURL)
      .subscribe(result => {
        result.forEach((element: any) => {
          output = output.concat(element);
        });

        /* Reformating Data from API*/
        this.data = this.dataHelper.convertPublicationData(output);

        this.alert.dismiss();
        this.alert.success(this.data.length + ' record(s) has found');

        /* Enable export button */
        if (this.data.length > 0) {
          this.disabledExportButton = false;
        } else {
          this.disabledExportButton = true;
        }
        this.dataSource.data = this.data;
      });
  }

  resetDataTable() {
    this.dataSource.data = [];
    this.disabledExportButton = true;
  }

  searchFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  export() {
    this.exportService.exportAsExcelFile(
      this.dataHelper.trimData(this.data),
      'Counter_Report_'
    );
  }

  ngOnDestroy() {
    if (this.getResultSubscriber) {
      this.getResultSubscriber.unsubscribe();
    }
  }
}
