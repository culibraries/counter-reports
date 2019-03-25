import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PlatformService, Platform } from '../../core';

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
  options = [];
  filteredOptions: Observable<any>;
  selectedFilter: string;
  platforms1: Platform[];

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

  platforms: string[] = [];

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

  constructor(private platformService: PlatformService) {}

  ngOnInit() {
    this.platformService.getAll().subscribe(data => {
      data.forEach(e => {
        this.platforms.push(e.name);
      });
      console.log(this.platforms);
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  resetFilterOption() {
    this.selectedFilter = undefined;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  onChangeFilterOption() {
    if (this.selectedFilter) {
      if (this.selectedFilter === 'year') {
        this.options = this.years;
      }
      if (this.selectedFilter === 'publisher') {
        this.options = this.publishers;
      }
      if (this.selectedFilter === 'platform') {
        this.options = this.platforms;
      }
    }
  }
}
