import { Publication } from '../models';

export class DataHelper {
  constructor() {}

  convertPublicationData(publication: Publication[]): Array<{}> {
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

  trimData(data: any) {
    data.forEach(i => {
      i.MonthsTotal.forEach(months => {
        i[months.month] = months.total;
      });
      delete i.MonthsTotal;
      delete i.period;
      delete i.requests;
      delete i.id;
      delete i.Total;
    });
    return data;
  }
}
