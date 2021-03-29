import { Publication } from '../models';
import { MonthConvertPipe } from '../../shared/pipes/month-convert.pipe';
export class DataHelper {
  monthPipe = new MonthConvertPipe();
  constructor() {}

  convertPublicationData(publication: Publication[]): Array<{}> {
    let total = 0;
    let total_unique = 0;
    publication.sort(function (a, b) {
      return a['id'] - b['id'];
    });

    const output = Object.values(
      publication.reduce((r, o, i, arr) => {
        const key = `${o.title}-${o.publisher}-${o.platform}`;
        if (!r[key]) {
          total = 0;
          total_unique = 0;
          r[key] = {
            ...o,
            MonthsTotalItemRequests: [],
            MonthsUniqueItemRequests: [],
          };
        }
        if (o.metric_type == 'Total_Item_Requests') {
          r[key].MonthsTotalItemRequests.push({
            month: o.period,
            total: o.period_total,
          });
          total += o.period_total;
          r[key].total = total;
        } else if (o.metric_type == 'Unique_Item_Requests') {
          r[key].MonthsUniqueItemRequests.push({
            month: o.period,
            total: o.period_total,
          });
          total_unique += o.period_total;
          r[key].total_unique = total_unique;
        }

        return r;
      }, {})
    );

    output.forEach((e, i, arr) => {
      if (arr[i]['MonthsTotalItemRequests'].length > 0) {
        arr[i]['effective_dates'] =
          this.monthPipe.transform(arr[i]['MonthsTotalItemRequests'][0].month) +
          ' ' +
          this.monthPipe.transform(
            arr[i]['MonthsTotalItemRequests'][
              arr[i]['MonthsTotalItemRequests'].length - 1
            ].month
          );
      }
    });

    return output;
  }

  trimData(data: any[]) {
    data.map((r) => {
      if (r.MonthsTotal) {
        r.MonthsTotal.forEach((months) => {
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
