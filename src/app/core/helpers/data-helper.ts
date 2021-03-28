import { Publication } from '../models';
import { MonthConvertPipe } from '../../shared/pipes/month-convert.pipe';
export class DataHelper {
  monthPipe = new MonthConvertPipe();
  constructor() {}

  convertPublicationData(publication: Publication[]): Array<{}> {
    let total = 0;
    const output = Object.values(
      publication.reduce((r, o, i, arr) => {
        const key = `${o.title}-${o.publisher}-${o.platform}`;
        if (!r[key]) {
          total = 0;
          r[key] = { ...o, MonthsTotal: [] };
        }
        r[key].MonthsTotal.push({
          month: o.period,
          total: o.requests,
        });
        total += o.requests;
        r[key].total = total;
        return r;
      }, {})
    );

    output.forEach((e, i, arr) => {
      arr[i]['effective_dates'] =
        this.monthPipe.transform(arr[i]['MonthsTotal'][0].month) +
        ' ' +
        this.monthPipe.transform(
          arr[i]['MonthsTotal'][arr[i]['MonthsTotal'].length - 1].month
        );
      arr[i]['total_requests'] = Math.floor(Math.random() * 100) + 10;
      arr[i]['total_uniques'] = Math.floor(Math.random() * 100) + 10;

    });
    return output;
  }

  trimData(data: any[]) {
    data.map(r => {
      if (r.MonthsTotal) {
        r.MonthsTotal.forEach(months => {
          r[months.month] = months.total;
        });
      }
    });
    const output = data.map(
      ({ id, period, MonthsTotal, requests, ...title }) => title
    );
    return output;
  }
}
