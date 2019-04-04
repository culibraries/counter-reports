import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { PublicationService, Publication, PublisherService } from '../../core';

export interface PeriodicElement {
  title: string;
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

const ELEMENT_DATA: Publication[] = [
  // {
  //   title: 'Communications of the ACM',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '0001-0782',
  //   online_issn: '1557-7317',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd',
  //   description: 'Reporting Period Total 17640 <br>'
  // },
  // {
  //   title: 'Journal of Data and Information Quality (JDIQ)',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '',
  //   online_issn: '1557-7317',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title: 'ACM SIGOPS Operating Systems Review',
  //   publisher: 'ABM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '1936-1955',
  //   online_issn: '1557-7317',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title: 'ACM Transactions on Mathematical Software (TOMS)',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '1936-1955',
  //   online_issn: '1557-7317',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title: 'Personal and Ubiquitous Computing',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '1936-1955',
  //   online_issn: '1557-7317',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title: 'ACM Transactions on Computation Theory (TOCT)',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '1936-1955',
  //   online_issn: '1557-7317',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title: 'ACM Transactions on Economics and Computation (TEAC)',
  //   publisher: 'CNN',
  //   platform: 'ACM Digital Library',
  //   print_issn: '1936-1955',
  //   online_issn: '',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title:
  //     'IEEE/ACM Transactions on Computational Biology and Bioinformatics (TCBB)',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '1936-1955',
  //   online_issn: '',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title: 'ACM SIGBED Review',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '',
  //   online_issn: '1557-7317',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // },
  // {
  //   title: 'ACM Inroads',
  //   publisher: 'ACM',
  //   platform: 'ACM Digital Library',
  //   print_issn: '1936-1955',
  //   online_issn: '',
  //   description: 'ok: 38298392',
  //   reporting_period_total: 17640,
  //   reporting_period_html: 432,
  //   reporting_period_pdf: 563,
  //   jan: 13,
  //   feb: 15,
  //   march: 43,
  //   april: 223,
  //   may: 32,
  //   june: 52,
  //   july: 12,
  //   aug: 43,
  //   sep: 3,
  //   oct: 12,
  //   nov: 12,
  //   dec: 432,
  //   doi: '10.1090/ecgd'
  // }
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
    'publisher_id',
    'title',
    'platform',
    'print_issn',
    'online_issn',
    'reporting_period_total'
  ];

  expandedElement: Publication | null;
  publicationData: Publication[] = [];
  dataSource = new MatTableDataSource(this.publicationData);
  tmpPublisher: any[] = [];
  publishers: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private publicationService: PublicationService,
    private publisherService: PublisherService
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.publisherService.getAll().subscribe(data => {
      this.publishers = data;
    });
  }
  reset(data: any[]) {
    this.dataSource.data = [];
  }
  sendData(data: any[]) {
    let publisherR = data['publisher'];
    this.tmpPublisher = [];
    console.log(publisherR);
    let titleR = data['title'];
    if (publisherR.length !== 0) {
      publisherR.forEach(element => {
        this.publishers.forEach(e => {
          if (element === e.name) {
            this.tmpPublisher.push(e.id);
          }
        });
      });
    } else {
      this.tmpPublisher.push('pass');
    }

    if (data['publisher'].length === 0 && data['title'] === 0) {
      this.publicationService.getAll().subscribe(data => {
        this.dataSource.data = data;
      });
    } else {
      console.log(this.tmpPublisher.toString(), titleR.toString());
      this.publicationService
        .getByFilters(this.tmpPublisher.toString(), titleR.toString())
        .subscribe(result => {
          result.forEach(e => {
            this.publishers.forEach(item => {
              if (item.id === e.publisher_id) {
                e.publisher_id = item['name'];
              }
            });
          });
          this.dataSource.data = result;
        });
    }
  }
  resetDataListTable() {
    console.log('ok');
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
