import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthConvert' })
export class MonthConvertPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return '';
    }
    const arrDate = value.split('-');
    const year = arrDate[0];
    let output = '';
    switch (arrDate[1]) {
      case '01': {
        output = 'January';
        break;
      }
      case '02': {
        output = 'Febuary';
        break;
      }
      case '03': {
        output = 'March';
        break;
      }
      case '04': {
        output = 'April';
        break;
      }
      case '05': {
        output = 'May';
        break;
      }
      case '06': {
        output = 'June';
        break;
      }
      case '07': {
        output = 'July';
        break;
      }
      case '08': {
        output = 'August';
        break;
      }
      case '09': {
        output = 'September';
        break;
      }
      case '10': {
        output = 'October';
        break;
      }
      case '11': {
        output = 'November';
        break;
      }
      case '12': {
        output = 'December';
        break;
      }
    }
    output += '-' + year;
    return output;
  }
}
