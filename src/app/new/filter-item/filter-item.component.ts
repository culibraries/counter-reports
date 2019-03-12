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
export interface Publisher {
  value: string;
  viewValue: string;
}
export interface Platform {
  value: string;
  viewValue: string;
}
export interface Year {
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

  publishers: Platform[] = [
    { value: 'acm-digital-library', viewValue: 'ACM Digital Library ' },
    { value: 'wed-digital-library', viewValue: 'WED Digital Library ' },
    { value: 'abc-digital-library', viewValue: 'TGD Digital Library ' },
    { value: 'pof-digital-library', viewValue: 'HJQ Digital Library ' }
  ];

  platforms: Platform[] = [
    { value: 'acm', viewValue: 'ACM' },
    { value: 'wed', viewValue: 'WED ' },
    { value: 'abc', viewValue: 'TGD ' },
    { value: 'pof', viewValue: 'HJQ ' }
  ];

  contents: Content[] = [];

  years: Year[] = [
    { value: '2018', viewValue: '2018' },
    { value: '2017', viewValue: '2017' },
    { value: '2016', viewValue: '2016' },
    { value: '2015', viewValue: '2015' },
    { value: '2014', viewValue: '2014' },
    { value: '2013', viewValue: '2013' },
    { value: '2012', viewValue: '2012' },
    { value: '2011', viewValue: '2011' },
    { value: '2010', viewValue: '2010' },
    { value: '2009', viewValue: '2009' },
    { value: '2008', viewValue: '2008' },
    { value: '2007', viewValue: '2007' },
    { value: '2006', viewValue: '2006' },
    { value: '2005', viewValue: '2005' }
  ];

  constructor() {
    this.contents = this.publishers;
  }

  ngOnInit() {}
  change(event) {
    if (event.isUserInput) {
      if (event.source.value === 'year') {
        this.contents = this.years;
      }
      if (event.source.value === 'publisher') {
        this.contents = this.publishers;
      }
      if (event.source.value === 'platform') {
        this.contents = this.platforms;
      }
    }
  }
}
