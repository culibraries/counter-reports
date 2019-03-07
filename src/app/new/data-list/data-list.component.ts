import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
export interface PeriodicElement {
  title: string;
  position: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    title: 'Total for all journals',
    position: 1
  },
  {
    title: 'Total for all journals',
    position: 2
  }
];

@Component({
  selector: 'app-data-list',
  templateUrl: './data-list.component.html',
  styleUrls: ['./data-list.component.css']
})
export class DataListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  constructor() {}

  ngOnInit() {}
}
