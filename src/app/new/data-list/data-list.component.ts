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
import { Subscription } from 'rxjs';

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
    'status',
    'total_requests',
    'total_uniques',
    'total',
  ];
  randomNumber = Math.floor(Math.random() * 100) + 1;
  expandedElement: [] | null;
  data: any;
  monthDatas: MonthData[] = [];
  dataSource = new MatTableDataSource([]);
  disabledExportButton: boolean;
  getResultSubscriber: Subscription;
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
    this.resetDataTable();
    if (filterURL === '') {
      this.alert.default(Config.messages.warningAllRecords);
    } else {
      this.alert.loading('loading...');
    }
    this.applyFilterByCallingAPI(filterURL);
  }

  private applyFilterByCallingAPI(filterURL: string) {
    let output = [];

    this.getResultSubscriber = this.publicationService
      .getByPageNext(filterURL)
      .subscribe(
        res => {
          res.forEach((e: any) => {
            output = output.concat(e);
          });

          if (output.length > 0) {
            this.disabledExportButton = false;
            /* Reformating Data from API*/
            this.data = this.dataHelper.convertPublicationData(output);

            // Displaying alert
            this.alert.success(this.data.length + ' record(s) has found');
            this.data['status'] = 'P';
            // Load data to table
            this.dataSource.data = this.data;
          } else {
            // Displaying alert
            this.alert.success('0 record has found');
            this.disabledExportButton = true;
          }
        },
        err => this.alert.danger('Error! Please try again or submit a ticket.'),
        () => void 0
      );
  }

  resetDataTable() {
    this.dataSource.data = [];
    this.disabledExportButton = true;
    this.ngOnDestroy();
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
    this.alert.dismiss();
  }
}
