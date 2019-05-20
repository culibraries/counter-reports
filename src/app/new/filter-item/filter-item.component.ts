import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PlatformService, PublisherService, TitleService } from '../../core';
import { Config } from '../../core';
import { ActivatedRoute } from '@angular/router';

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
  monthSelected: string;
  yearSelected: string;
  doneLoading: boolean = false;
  @Input() itemDetail: {};

  filters: Filter[] = [
    { value: 'platform', viewValue: 'Platform' },
    { value: 'publisher', viewValue: 'Publisher' },
    { value: 'title', viewValue: 'Title' },
    { value: 'from', viewValue: 'From' },
    { value: 'to', viewValue: 'To' }
  ];

  years: string[] = Config.years;
  months: string[] = Config.months;
  filterDisplayTransform: [] = [];

  @Output() platfomrsTest: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private platformService: PlatformService,
    private publisherService: PublisherService,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (typeof this.itemDetail !== 'number') {
      const key = Object.keys(this.itemDetail);
      const value = Object.values(this.itemDetail)
        .toString()
        .replace(/%26/g, '&');
      this.selectedFilter = key[0];
      this.filterControl.setValue(value);
      this.loadFilterValueBySelectedFilter(this.selectedFilter);
      if (key[0] === 'from' || key[0] === 'to') {
        this.yearSelected = value.split('-')[0];
        this.monthSelected = value.split('-')[1];
      }
    }

    this.filteredOptions = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => (value.length >= 1 ? this._filter(value).slice(0, 30) : []))
    );
  }

  isEmpty(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }

  loadFilterValueBySelectedFilter(value: string) {
    this.filterControl.disable();
    this.doneLoading = true;

    switch (value) {
      case 'platform': {
        this.filterControl.enable();
        this.platformService.getAll().subscribe(data => {
          data.forEach(r => {
            this.platforms.push(r.name);
          });
          this.doneLoading = false;
        });
        this.options = this.platforms;
        break;
      }

      case 'publisher':
        {
          this.publisherService.getAll().subscribe(data => {
            this.filterControl.enable();
            data.forEach(r => {
              this.publishers.push(r.name);
            });
            this.doneLoading = false;
          });
        }
        this.options = this.publishers;
        break;

      case 'title': {
        this.titleService.getAll().subscribe(data => {
          this.filterControl.enable();
          data.forEach(r => {
            this.titles.push(r.title);
          });
          this.doneLoading = false;
        });
        this.options = this.titles;
        break;
      }

      case 'from': {
        this.filterControl.enable();
        this.selectedFilterValue = 'from';
        this.doneLoading = false;

        break;
      }

      case 'to': {
        this.filterControl.enable();
        this.selectedFilterValue = 'to';
        this.doneLoading = false;

        break;
      }

      default: {
        this.selectedFilter = '!';
        break;
      }
    }
  }

  onChangeFilterOption() {
    this.filterControl.setValue('');
    this.selectedFilterValue = '!';
    this.loadFilterValueBySelectedFilter(this.selectedFilter);
  }

  resetFilterOption() {
    this.selectedFilter = undefined;
    this.filterControl.setValue('');
    this.platforms = [];
    this.publishers = [];
    this.titles = [];
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
