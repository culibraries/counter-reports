import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Filter } from '../models';
import { Config } from '../config';

const config = Config.validatorMessage;
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private alert: AlertService) {}

  validateFilters(filterItems: any, filter: Filter): boolean {
    let valid = 1;
    let fromCount = 0;
    let toCount = 0;
    let fromDate: Date;
    let toDate: Date;
    let isFromToSelected = 0; //Check if from filter and to filter are both selected

    filterItems.forEach(e => {
      if (e.selectedFilter === 'from') {
        fromCount++;
        isFromToSelected++;
        if (fromCount === 2) {
          this.alert.danger(config.duplicatedFromField);
          valid = 0;
        }
        if (!e.yearSelected || !e.monthSelected) {
          this.alert.danger(config.requiredFromField);
          valid = 0;
        } else {
          fromDate = new Date(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );
          filter.setFrom(e.yearSelected + '-' + e.monthSelected + '-' + '01');
        }
      }

      if (e.selectedFilter === 'to') {
        toCount++;
        isFromToSelected++;
        if (toCount === 2) {
          this.alert.danger(config.duplicatedToField);
          valid = 0;
        }
        if (!e.yearSelected || !e.monthSelected) {
          this.alert.danger(config.requiredToField);
          valid = 0;
        } else {
          toDate = new Date(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );

          filter.setTo(e.yearSelected + '-' + e.monthSelected + '-' + '01');
        }
      }

      if (isFromToSelected === 2 && fromDate && toDate) {
        if (toDate < fromDate) {
          this.alert.danger(config.validFromToField);
          valid = 0;
        }
      }

      if (isFromToSelected === 2 && !fromDate && toDate) {
        this.alert.danger(config.requiredFromField);
        valid = 0;
      }

      if (e.selectedFilter === 'platform') {
        if (!e.myGroup.get('keyInput').value) {
          this.alert.danger(config.requiredPlatform);
          valid = 0;
        } else {
          filter.setPlatform(
            e.myGroup.get('keyInput').value + ',' + e.selectedFilterType
          );
        }
      }

      if (e.selectedFilter === 'publisher') {
        if (!e.myGroup.get('keyInput').value) {
          this.alert.danger(config.requiredPublisher);
          valid = 0;
        } else {
          filter.setPublisher(
            e.myGroup.get('keyInput').value + ',' + e.selectedFilterType
          );
        }
      }

      if (e.selectedFilter === 'title') {
        if (!e.myGroup.get('keyInput').value) {
          this.alert.danger(config.requiredTitle);
          valid = 0;
        } else {
          filter.setTitle(
            e.myGroup.get('keyInput').value + ',' + e.selectedFilterType
          );
        }
      }
    });

    return valid ? true : false;
  }
}
