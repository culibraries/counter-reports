import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { PublicationService, Publication, PublisherService } from '../../core';
import { Result, MonthData } from '../../core';
import { AlertService } from '../../core';
import { MatSnackBar } from '@angular/material';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

const EXCEL_EXTENSION = '.xlsx';

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
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class DataListComponent implements OnInit {
  displayedColumns: string[] = [
    'Title',
    'Publisher',
    'Platform',
    'PrintISSN',
    'OnlineISSN',
    'Total'
  ];
  expandedElement: [] | null;
  // results: Result[] = [];
  // resultPublication: Result = {
  //   title: '',
  //   platform: '',
  //   publisher: '',
  //   monthTotals: [],
  //   total: 0
  // };
  monthDatas: MonthData[] = [];
  monthData: MonthData = { month: '', total: 0 };
  dataSource = new MatTableDataSource([]);
  activeExportButton: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private publicationService: PublicationService,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.activeExportButton = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  reset(data: any[]) {
    this.dataSource.data = [];
    this.activeExportButton = true;
  }

  sendData(data: string) {
    this.snackBar.open('loading...', '', {
      duration: 4000,
      panelClass: ['alert-success']
    });
    this.publicationService.getByFilters(data).subscribe(result => {
      let total = 0;
      const output = Object.values(
        result.reduce((r, o) => {
          const key = `${o.title}-${o.publisher}-${o.platform}`;
          if (!r[key]) {
            total = 0;
            r[key] = { ...o, MonthsTotal: [] };
          }
          r[key].MonthsTotal.push({
            month: this.convertDatetoMonth(o.period),
            total: o.requests
          });
          total += o.requests;
          r[key].Total = total;
          return r;
        }, {})
      );
      this.dataSource.data = output;
      if (this.dataSource.data.length > 0) {
        // this.alertService.success(
        //   this.dataSource.data.length + ' record(s) has found successfully'
        // );
        this.snackBar.open(
          'All Done ! ' + this.dataSource.data.length + ' record(s) has found',
          '',
          {
            duration: 4000,
            panelClass: ['alert-success']
          }
        );
        this.activeExportButton = false;
      }
    });
  }

  private convertDatetoMonth(period: string): string {
    let arrDate = period.split('-');
    let year = arrDate[0];
    let output = '';
    switch (arrDate[1]) {
      case '01': {
        output = 'January';
        break;
      }
      case '02': {
        output = 'Febuary';
        break;
      }
      case '03': {
        output = 'March';
        break;
      }
      case '04': {
        output = 'April';
        break;
      }
      case '05': {
        output = 'May';
        break;
      }
      case '06': {
        output = 'June';
        break;
      }
      case '07': {
        output = 'July';
        break;
      }
      case '08': {
        output = 'August';
        break;
      }
      case '09': {
        output = 'September';
        break;
      }
      case '10': {
        output = 'October';
        break;
      }
      case '11': {
        output = 'November';
        break;
      }
      case '12': {
        output = 'December';
        break;
      }
    }
    output += '-' + year;
    return output;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  export() {
    this.dataSource.data.forEach(function(i) {
      i.MonthsTotal.forEach(function(months) {
        i[months.month] = months.total;
      });
      delete i.MonthsTotal;
      delete i.period;
      delete i.requests;
    });
    // console.log(this.dataSource.data);

    this.exportAsExcelFile(this.dataSource.data, 'Counter_Report_');
  }

  private exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
      header: [
        'title',
        'publisher',
        'platform',
        'journal_doi',
        'proprietary_id',
        'print_issn',
        'online_issn',
        'Total'
      ]
    });
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
  }
}
