import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Config } from '../config';

const config = Config.validatorMessage;
@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor(private alert: AlertService) {}

  validateFilters(filterItemList: any): boolean {
    let valid = true;
    let fromCount = 0;
    let toCount = 0;
    let fromDate: Date;
    let toDate: Date;
    let isFromToSelected = 0; //Check if 'From' filter option and 'To' filter option are both selected

    filterItemList.forEach(e => {
      if (e.selectedFilter === 'from') {
        fromCount++;
        isFromToSelected++;
        if (fromCount === 2) {
          this.alert.danger(config.duplicatedFromField);
          return (valid = false);
        }
        if (!e.yearSelected || !e.monthSelected) {
          this.alert.danger(config.requiredFromField);
          return (valid = false);
        } else {
          fromDate = new Date(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );
        }
      }

      if (e.selectedFilter === 'to') {
        toCount++;
        isFromToSelected++;
        if (toCount === 2) {
          this.alert.danger(config.duplicatedToField);
          valid = false;
        }
        if (!e.yearSelected || !e.monthSelected) {
          this.alert.danger(config.requiredToField);
          valid = false;
        } else {
          toDate = new Date(
            e.yearSelected + '-' + e.monthSelected + '-' + '01'
          );
        }
      }

      if (isFromToSelected === 2 && fromDate && toDate) {
        if (toDate < fromDate) {
          this.alert.danger(config.validFromToField);
          valid = false;
        }
      }

      if (isFromToSelected === 2 && !fromDate && toDate) {
        this.alert.danger(config.requiredFromField);
        valid = false;
      }

      if (e.selectedFilter === 'platform') {
        if (!e.myGroup.get('keyInput').value) {
          this.alert.danger(config.requiredPlatform);
          valid = false;
        }
      }

      if (e.selectedFilter === 'publisher') {
        if (!e.myGroup.get('keyInput').value) {
          this.alert.danger(config.requiredPublisher);
          valid = false;
        }
      }

      if (e.selectedFilter === 'title') {
        if (!e.myGroup.get('keyInput').value) {
          this.alert.danger(config.requiredTitle);
          valid = false;
        }
      }
    });

    return valid;
  }
}
