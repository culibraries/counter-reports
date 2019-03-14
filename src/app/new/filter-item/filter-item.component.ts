import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  myControl = new FormControl();
  options: any;
  filteredOptions: Observable<any>;

  filters: Filter[] = [
    { value: 'publisher', viewValue: 'Publisher' },
    { value: 'platform', viewValue: 'Platform' },
    { value: 'title', viewValue: 'Journal Title' },
    { value: 'year', viewValue: 'Year' }
  ];

  publishers: string[] = [
    'ACM Digital Library ',
    'WED Digital Library ',
    'TGD Digital Library ',
    'HJQ Digital Library '
  ];

  platforms: string[] = ['ACM', 'CNN', 'ABC', 'WED'];

  contents: Content[] = [];

  years: string[] = [
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009'
  ];

  constructor() {
    this.options = [];
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  change(event) {
    if (event.isUserInput) {
      if (event.source.value === 'year') {
        this.options = this.years;
      }
      if (event.source.value === 'publisher') {
        this.options = this.publishers;
      }
      if (event.source.value === 'platform') {
        this.options = this.platforms;
      }
    }
  }
}
