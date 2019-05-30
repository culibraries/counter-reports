import { Publication } from '../models';

export class DataHelper {
  constructor() {}

  convertPublicationData(publication: Publication[]): Array<{}> {
    console.log('convert Publication');
    let total = 0;
    const output = Object.values(
      publication.reduce((r, o) => {
        const key = `${o.title}-${o.publisher}-${o.platform}`;
        if (!r[key]) {
          total = 0;
          r[key] = { ...o, MonthsTotal: [] };
        }
        r[key].MonthsTotal.push({
          month: o.period,
          total: o.requests
        });
        total += o.requests;
        r[key].total = total;
        return r;
      }, {})
    );
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
