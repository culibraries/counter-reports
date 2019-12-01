import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { PlatformService, PublisherService, TitleService } from '../../core';
import { Config } from '../../core';

export interface IFilter {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter-item',
  templateUrl: './filter-item.component.html',
  styleUrls: ['./filter-item.component.css'],
})
export class FilterItemComponent implements OnInit, OnDestroy {
  filters: IFilter[] = [
    { value: 'platform', viewValue: 'Platform' },
    { value: 'publisher', viewValue: 'Publisher' },
    { value: 'title', viewValue: 'Title' },
    { value: 'from', viewValue: 'From' },
    { value: 'to', viewValue: 'To' },
  ];

  filterTypes: IFilter[] = [
    { value: 'is', viewValue: 'is' },
    { value: 'is_not', viewValue: 'is NOT' },
    { value: 'contains', viewValue: 'contains' },
    { value: 'does_not_contains', viewValue: 'does NOT contains' },
    { value: 'starts_with', viewValue: 'starts with' },
    { value: 'ends_with', viewValue: 'ends with' },
  ];
  options = [];
  filteredOptions: Observable<any>;
  selectedFilter = '';
  selectedFilterType = '';
  selectedFilterValue = '!';

  monthSelected: string;
  yearSelected: string;
  isAutocompleteDisabled = true;
  myGroup: FormGroup;
  doneLoading = false;

  @Input() itemDetail: any;

  years: string[] = Config.years;
  months: string[] = Config.months;
  filterDisplayTransform: [] = [];
  keySubscriber: any;

  constructor(
    private platformService: PlatformService,
    private publisherService: PublisherService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    // Set default value
    this.myGroup = new FormGroup({
      keyInput: new FormControl(''),
    });
    this.selectedFilter = 'platform';
    this.selectedFilterType = 'is';
    // Load filterRecords into correctsponding filter fields.
    if (Object.keys(this.itemDetail).length > 0) {
      const key = Object.keys(this.itemDetail);
      const value = Object.values(this.itemDetail)
        .toString()
        .replace(/%26/g, '&');

      if (key[0] === 'from' || key[0] === 'to') {
        this.yearSelected = value.split('-')[0];
        this.monthSelected = value.split('-')[1];
      }

      const arrValue = value.split(',');

      this.selectedFilterType = arrValue.pop();

      this.selectedFilter = key[0];
      this.myGroup.setValue({
        keyInput: arrValue.join(','),
      });
    }
    this.loadFilterValueBySelectedFilter(this.selectedFilter);
  }

  onKeySearchFocus() {
    if (this.myGroup.get('keyInput').value.length < 3) this.options = [];
  }

  loadFilterValueBySelectedFilter(value: string) {
    this.options = [];

    if (this.keySubscriber) {
      this.keySubscriber.unsubscribe();
    }

    switch (value) {
      case 'platform':
        this.keySubscriber = this.myGroup
          .get('keyInput')
          .valueChanges.pipe(debounceTime(500))
          .subscribe((val: any) => {
            this.options = [];
            if (this.isFilterTypeIsOrIsNot()) {
              const key = val.trim();
              if (key.length >= 3) {
                this.doneLoading = true;
                this.platformService.get(key).subscribe(data => {
                  if (data.length > 0) {
                    data.forEach(r => {
                      this.options.push(r.name);
                    });
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
        this.keySubscriber = this.myGroup
          .get('keyInput')
          .valueChanges.pipe(debounceTime(500))
          .subscribe((val: any) => {
            this.options = [];
            if (this.isFilterTypeIsOrIsNot()) {
              const key = val.trim();
              if (key.length >= 3) {
                this.doneLoading = true;
                this.publisherService.get(key).subscribe(data => {
                  if (data.length > 0) {
                    data.forEach(r => {
                      this.options.push(r.name);
                    });
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

      case 'title':
        this.keySubscriber = this.myGroup
          .get('keyInput')
          .valueChanges.pipe(debounceTime(500))
          .subscribe((val: any) => {
            this.options = [];
            if (this.isFilterTypeIsOrIsNot()) {
              const key = val.trim();
              if (key.length >= 3) {
                this.doneLoading = true;
                this.titleService.get(key).subscribe(data => {
                  if (data.length > 0) {
                    data.forEach(r => {
                      this.options.push(r.title);
                    });
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
        // Only load 'is' filterType to filterType dropdown
        this.filterTypes = this.filterTypes.filter(
          filter => filter.value === 'is'
        );
        this.selectedFilterType = 'is';
        this.selectedFilterValue = 'from';
        break;
      }

      case 'to': {
        // Only load 'is' filterType to filterType dropdown
        this.filterTypes = this.filterTypes.filter(
          filter => filter.value === 'is'
        );
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

  isFilterTypeIsOrIsNot(): boolean {
    return (
      this.selectedFilterType === 'is' || this.selectedFilterType === 'is_not'
    );
  }

  onChangeFilterType() {
    // Reset keyInput: empty
    this.myGroup.setValue({ keyInput: '' });

    // Disable autocomplete if filterType NOT : is or is_not
    this.isAutocompleteDisabled = !this.isFilterTypeIsOrIsNot();
  }

  resetFilterOption() {
    this.selectedFilter = undefined;
    this.myGroup.setValue({ keyInput: '' });
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    if (this.keySubscriber) {
      this.keySubscriber.unsubscribe();
    }
  }
}
