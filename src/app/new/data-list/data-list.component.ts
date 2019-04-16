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
import { Result, MonthData } from '../../core/models/result.model';

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
    'Publisher',
    'Title',
    'Platform',
    'PrintISSN',
    'OnlineISSN',
    'Total'
  ];
  results: Result[] = [];
  resultPublication: Result = {
    title: '',
    platform: '',
    publisher: '',
    monthTotals: [],
    total: 0
  };
  monthDatas: MonthData[] = [];
  monthData: MonthData = { month: '', total: 0 };
  expandedElement: Publication | null;
  publicationData: any[] = [];
  dataSource = new MatTableDataSource(this.publicationData);
  // tmpPublisher: any[] = [];
  // publishers: any[] = [];
  activeExportButton: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private publicationService: PublicationService) {}

  ngOnInit() {
    this.activeExportButton = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.publisherService.getAll().subscribe(data => {
    //   this.publishers = data;
    // });
  }
  reset(data: any[]) {
    this.dataSource.data = [];
    this.activeExportButton = true;
  }
  sendData(data: string) {
    this.publicationService.getByFilters(data).subscribe(result => {
      // console.log(result);
      let total = 0;
      const output = Object.values(
        result.reduce((r, o) => {
          const key = `${o.Title}-${o.Publisher}-${o.Platform}`;

          if (!r[key]) {
            total = 0;
            r[key] = { ...o, MonthsTotal: [] };
          }

          r[key].MonthsTotal.push({
            month: this.convertDatetoMonth(o.Period),
            total: o.Total
          });
          total += o.Total;
          r[key].Total = total;
          return r;
        }, {})
      );
      // console.log(output);
      this.dataSource.data = output;
      if (this.dataSource.data.length > 0) {
        this.activeExportButton = false;
      }
    });
  }

  private convertDatetoMonth(period: string): string {
    let arrDate = period.split('-');
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

    return output;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  export() {
    // let x = this.dataSource.data.map(function(val) {
    //   return val.splice(0, -1);
    // });
    // console.log(x);
    this.dataSource.data.forEach(function(i) {
      i.MonthsTotal.forEach(function(months) {
        i[months.month] = months.total;
      });
      delete i.MonthsTotal;
      delete i.Period;
      // delete i['is_active'];
    });
    console.log(this.dataSource.data);

    this.exportAsExcelFile(this.dataSource.data, 'Counter_Report_');
  }

  private exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {
      header: [
        'Title',
        'Publisher',
        'Platform',
        'PrintISSN',
        'OnlineISSN',
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
