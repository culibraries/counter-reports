import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PlatformService, Platform, PublisherService } from '../../core';

export interface Filter {
  value: string;
  viewValue: string;
}
export interface Content {
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
  filterControl = new FormControl();
  options = [];
  filteredOptions: Observable<any>;
  selectedFilter: string;

  filters: Filter[] = [
    { value: 'publisher', viewValue: 'Publisher' },
    { value: 'platform', viewValue: 'Platform' },
    { value: 'title', viewValue: 'Journal Title' },
    { value: 'year', viewValue: 'Year' }
  ];

  publishers: string[] = [];

  platforms: string[] = [];

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

  constructor(
    private platformService: PlatformService,
    private publisherService: PublisherService
  ) {}

  ngOnInit() {
    this.platformService.getAll().subscribe(data => {
      data.forEach(e => {
        this.platforms.push(e.name);
      });
    });

    this.publisherService.getAll().subscribe(data => {
      data.forEach(e => {
        this.publishers.push(e.name);
      });
    });

    this.filteredOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  resetFilterOption() {
    this.selectedFilter = undefined;
    this.filterControl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  onChangeFilterOption() {
    this.filterControl.setValue('');

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
