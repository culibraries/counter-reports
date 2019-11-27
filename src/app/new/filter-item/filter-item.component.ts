import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  styleUrls: ['./filter-item.component.css'],
})
export class FilterItemComponent implements OnInit, OnDestroy {
  options = [];
  filteredOptions: Observable<any>;
  selectedFilter: string;
  selectedFilterType: string;
  selectedFilterValue = '!';
  publishers: string[] = [];
  platforms: string[] = [];
  titles: string[] = [];
  monthSelected: string;
  yearSelected: string;
  isAutocompleteDisabled = true;
  myGroup: FormGroup;
  doneLoading: boolean = false;

  @Input() itemDetail: {};

  filters: Filter[] = [
    { value: 'platform', viewValue: 'Platform' },
    { value: 'publisher', viewValue: 'Publisher' },
    { value: 'title', viewValue: 'Title' },
    { value: 'from', viewValue: 'From' },
    { value: 'to', viewValue: 'To' },
  ];

  filterTypes: Filter[] = [
    { value: 'is', viewValue: 'is' },
    { value: 'is_not', viewValue: 'is NOT' },
    { value: 'contains', viewValue: 'contains' },
    { value: 'does_not_contains', viewValue: 'does NOT contains' },
    { value: 'starts_with', viewValue: 'starts with' },
    { value: 'ends_with', viewValue: 'ends with' },
  ];

  years: string[] = Config.years;
  months: string[] = Config.months;
  filterDisplayTransform: [] = [];
  keySubscriber: any;
  constructor(
    private platformService: PlatformService,
    private publisherService: PublisherService,
    private titleService: TitleService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.selectedFilterType = 'is';
    this.myGroup = new FormGroup({
      keyInput: new FormControl(),
    });

    if (typeof this.itemDetail !== 'number') {
      const key = Object.keys(this.itemDetail);
      const value = Object.values(this.itemDetail)
        .toString()
        .replace(/%26/g, '&');
      this.selectedFilter = key[0];
      this.myGroup.setValue({ keyInput: value });
      this.loadFilterValueBySelectedFilter(this.selectedFilter);
      if (key[0] === 'from' || key[0] === 'to') {
        this.yearSelected = value.split('-')[0];
        this.monthSelected = value.split('-')[1];
      }
    }
  }

  onKeySearchFocus() {
    if (this.myGroup.get('keyInput').value.length < 3) this.options = [];
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
    this.options = [];

    if (this.keySubscriber) {
      this.keySubscriber.unsubscribe();
    }
    switch (value) {
      case 'platform':
        this.options = [];
        this.keySubscriber = this.myGroup
          .get('keyInput')
          .valueChanges.pipe(debounceTime(500))
          .subscribe((val: any) => {
            this.options = [];
            if (
              this.selectedFilterType === 'is' ||
              this.selectedFilterType === 'is_not'
            ) {
              const key = val.trim();
              if (key.length >= 3) {
                this.doneLoading = true;

                this.platforms = [];
                this.platformService.get(key).subscribe(data => {
                  if (data.length > 0) {
                    data.forEach(r => {
                      this.platforms.push(r.name);
                    });
                    this.options = this.platforms;
                  }
                  this.doneLoading = false;
                });
              } else {
                this.doneLoading = false;

                this.options = [];
              }
            } else {
              this.isAutocompleteDisabled = true;
            }
          });
        break;

      case 'publisher':
        this.options = [];
        this.keySubscriber = this.myGroup
          .get('keyInput')
          .valueChanges.pipe(debounceTime(500))
          .subscribe((val: any) => {
            this.options = [];
            if (
              this.selectedFilterType === 'is' ||
              this.selectedFilterType === 'is_not'
            ) {
              const key = val.trim();
              if (key.length >= 3) {
                this.publishers = [];
                this.doneLoading = true;
                this.publisherService.get(key).subscribe(data => {
                  if (data.length > 0) {
                    data.forEach(r => {
                      this.publishers.push(r.name);
                    });
                    this.options = this.publishers;
                  }
                  this.doneLoading = false;
                });
              } else {
                this.options = [];
              }
            } else {
              this.isAutocompleteDisabled = true;
            }
          });
        break;

      case 'title':
        this.options = [];
        this.keySubscriber = this.myGroup
          .get('keyInput')
          .valueChanges.pipe(debounceTime(500))
          .subscribe((val: any) => {
            this.options = [];
            if (
              this.selectedFilterType === 'is' ||
              this.selectedFilterType === 'is_not'
            ) {
              const key = val.trim();
              if (key.length >= 3) {
                this.doneLoading = true;
                this.titles = [];
                this.titleService.get(key).subscribe(data => {
                  if (data.length > 0) {
                    data.forEach(r => {
                      this.titles.push(r.title);
                    });
                    this.options = this.titles;
                  }
                  this.doneLoading = false;
                });
              } else {
                this.doneLoading = false;
                this.options = [];
              }
            } else {
              this.isAutocompleteDisabled = true;
            }
          });
        break;

      case 'from': {
        this.filterTypes = [{ value: 'is', viewValue: 'is' }];
        this.selectedFilterType = 'is';
        this.selectedFilterValue = 'from';
        break;
      }

      case 'to': {
        this.filterTypes = [{ value: 'is', viewValue: 'is' }];
        this.selectedFilterType = 'is';
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
    this.myGroup.setValue({ keyInput: '' });
    this.selectedFilterValue = '!';
    this.loadFilterValueBySelectedFilter(this.selectedFilter);
  }

  onChangeFilterType() {
    this.myGroup.setValue({ keyInput: '' });
    if (
      this.selectedFilterType === 'is' ||
      this.selectedFilterType === 'is_not'
    ) {
      this.isAutocompleteDisabled = true;
    } else {
      this.isAutocompleteDisabled = false;
    }
  }

  resetFilterOption() {
    this.selectedFilter = undefined;
    this.myGroup.setValue({ keyInput: '' });
    this.platforms = [];
    this.publishers = [];
    this.titles = [];
  }

  ngOnDestroy() {
    if (this.keySubscriber) {
      this.keySubscriber.unsubscribe();
    }
  }
}
