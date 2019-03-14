import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export interface PeriodicElement {
  title: string;
  position: number;
  publisher: string;
  platform: string;
  print_issn: string;
  online_issn: string;
  description: string;
  reporting_period_total: number;
  reporting_period_html: number;
  reporting_period_pdf: number;
  jan: number;
  feb: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  aug: number;
  sep: number;
  oct: number;
  nov: number;
  dec: number;
  doi: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    title: 'Communications of the ACM',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '0001-0782',
    online_issn: '1557-7317',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd',
    description: 'Reporting Period Total 17640 <br>'
  },
  {
    position: 2,
    title: 'Journal of Data and Information Quality (JDIQ)',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '',
    online_issn: '1557-7317',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 3,
    title: 'ACM SIGOPS Operating Systems Review',
    publisher: 'ABM',
    platform: 'ACM Digital Library',
    print_issn: '1936-1955',
    online_issn: '1557-7317',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 4,
    title: 'ACM Transactions on Mathematical Software (TOMS)',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '1936-1955',
    online_issn: '1557-7317',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 5,
    title: 'Personal and Ubiquitous Computing',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '1936-1955',
    online_issn: '1557-7317',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 10,
    title: 'ACM Transactions on Computation Theory (TOCT)',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '1936-1955',
    online_issn: '1557-7317',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 6,
    title: 'ACM Transactions on Economics and Computation (TEAC)',
    publisher: 'CNN',
    platform: 'ACM Digital Library',
    print_issn: '1936-1955',
    online_issn: '',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 7,
    title:
      'IEEE/ACM Transactions on Computational Biology and Bioinformatics (TCBB)',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '1936-1955',
    online_issn: '',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 8,
    title: 'ACM SIGBED Review',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '',
    online_issn: '1557-7317',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  },
  {
    position: 9,
    title: 'ACM Inroads',
    publisher: 'ACM',
    platform: 'ACM Digital Library',
    print_issn: '1936-1955',
    online_issn: '',
    description: 'ok: 38298392',
    reporting_period_total: 17640,
    reporting_period_html: 432,
    reporting_period_pdf: 563,
    jan: 13,
    feb: 15,
    march: 43,
    april: 223,
    may: 32,
    june: 52,
    july: 12,
    aug: 43,
    sep: 3,
    oct: 12,
    nov: 12,
    dec: 432,
    doi: '10.1090/ecgd'
  }
];

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
    'position',
    'title',
    'publisher',
    'platform',
    'print_issn',
    'online_issn'
  ];
  expandedElement: PeriodicElement | null;
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
