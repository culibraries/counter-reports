import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  title: string;
  position: number;
  description: string;
  created_by: string;
  created_at: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    position: 1,
    title: 'JR1 ACM 2017',
    description:
      'This report is exported in order to get all JR1 report of ACM platform of 2017',
    created_by: 'Fred Schumacher',
    created_at: '2019-02-12 11:32:00'
  },
  {
    position: 2,
    title: 'JR1 ACM 2016',
    description:
      'This report is exported in order to get all JR1 report of ACM platform of 2017',
    created_by: 'Fred Schumacher',
    created_at: '2019-02-12 11:32:00'
  },
  {
    position: 3,
    title: 'JR1 ACM 2018',
    description:
      'This report is exported in order to get all JR1 report of ACM platform of 2017',
    created_by: 'Erin Block',
    created_at: '2019-02-12 11:32:00'
  },
  {
    position: 4,
    title: 'JR1 ACM 2019',
    description:
      'This report is exported in order to get all JR1 report of ACM platform of 2017',
    created_by: 'Erin Block',
    created_at: '2019-02-12 11:32:00'
  }
];
@Component({
  selector: 'app-viewandrun',
  templateUrl: './viewandrun.component.html',
  styleUrls: ['./viewandrun.component.css']
})
export class ViewandrunComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'title',
    'description',
    'created_by',
    'created_at',
    'actions'
  ];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
