import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PlatformService, PublisherService, TitleService } from '../../core';
import { Output, EventEmitter } from '@angular/core';

export interface Filter {
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
  selectedFilterValue = '!';
  publishers: string[] = [];
  platforms: string[] = [];
  titles: string[] = [];
  icon: string;
  monthSelected: string;
  yearSelected: string;

  filters: Filter[] = [
    { value: 'platform', viewValue: 'Platform' },
    { value: 'publisher', viewValue: 'Publisher' },
    { value: 'title', viewValue: 'Title' },
    { value: 'from', viewValue: 'From' },
    { value: 'to', viewValue: 'To' }
  ];

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

  months: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12'
  ];
  filterDisplayTransform: [] = [];
  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private platformService: PlatformService,
    private publisherService: PublisherService,
    private titleService: TitleService
  ) {}
  ngOnInit() {
    this.filteredOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  onChangeFilterOption() {
    this.filterControl.setValue('');
    this.selectedFilterValue = '!';

    switch (this.selectedFilter) {
      case 'platform': {
        this.platformService.getAll().subscribe(data => {
          data.forEach(r => {
            this.platforms.push(r.name);
          });
        });
        this.options = this.platforms;
        break;
      }
      case 'publisher': {
        this.publisherService.getAll().subscribe(data => {
          data.forEach(r => {
            this.publishers.push(r.name);
          });
        });
        this.options = this.publishers;
        break;
      }
      case 'title': {
        this.titleService.getAll().subscribe(data => {
          data.forEach(r => {
            this.titles.push(r.title);
          });
        });
        this.options = this.titles;
        break;
      }
      case 'from': {
        this.selectedFilterValue = 'from';
        break;
      }
      case 'to': {
        this.selectedFilterValue = 'to';
        break;
      }
      default: {
        this.selectedFilter = '!';
        break;
      }
    }
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
}
