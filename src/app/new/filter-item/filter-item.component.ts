import { Component, OnInit, Input } from '@angular/core';
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
  @Input() itemDetail: [];

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

  constructor(
    private platformService: PlatformService,
    private publisherService: PublisherService,
    private titleService: TitleService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.itemDetail) {
      const key = Object.keys(this.itemDetail);
      const value = Object.values(this.itemDetail).toString();
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
      map(value => (value.length >= 1 ? this._filter(value) : []))
    );
  }

  loadFilterValueBySelectedFilter(value: string) {
    switch (value) {
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

  onChangeFilterOption() {
    this.filterControl.setValue('');
    this.selectedFilterValue = '!';
    this.loadFilterValueBySelectedFilter(this.selectedFilter);
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
