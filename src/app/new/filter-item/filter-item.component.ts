import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface Filter {
  value: string;
  viewValue: string;
}
export interface Content {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css']
})
export class FilterItemComponent implements OnInit {
  filters: Filter[] = [
    { value: 'publisher', viewValue: 'Publisher' },
    { value: 'platform', viewValue: 'Platform' },
    { value: 'title', viewValue: 'Journal Title' },
    { value: 'year', viewValue: 'Year' }
  ];

  contents: Content[] = [
    { value: 'acm-digital-library', viewValue: 'ACM Digital Library ' },
    { value: 'wed-digital-library', viewValue: 'WED Digital Library ' },
    { value: 'abc-digital-library', viewValue: 'TGD Digital Library ' },
    { value: 'pof-digital-library', viewValue: 'HJQ Digital Library ' }
  ];

  constructor() {}

  ngOnInit() {}
}
