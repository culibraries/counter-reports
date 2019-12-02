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
        output = 'Jan';
        break;
      }
      case '02': {
        output = 'Feb';
        break;
      }
      case '03': {
        output = 'Mar';
        break;
      }
      case '04': {
        output = 'Apr';
        break;
      }
      case '05': {
        output = 'May';
        break;
      }
      case '06': {
        output = 'Jun';
        break;
      }
      case '07': {
        output = 'Jul';
        break;
      }
      case '08': {
        output = 'Aug';
        break;
      }
      case '09': {
        output = 'Sep';
        break;
      }
      case '10': {
        output = 'Oct';
        break;
      }
      case '11': {
        output = 'Nov';
        break;
      }
      case '12': {
        output = 'Dec';
        break;
      }
    }
    output += '-' + year;
    return output;
  }
}
