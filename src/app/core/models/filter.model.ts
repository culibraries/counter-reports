export class Filter {
  title?: string[];
  platform?: string[];
  publisher?: string[];
  from?: string;
  to?: string;

  constructor() {
    this.platform = [];
    this.publisher = [];
    this.title = [];
    this.from = '';
    this.to = '';
  }

  reset() {
    this.platform = [];
    this.publisher = [];
    this.title = [];
    this.from = '';
    this.to = '';
  }

  convertedObject(
    title: string,
    platform: string,
    publisher: string,
    range: string
  ): Filter {
    const filter = new Filter();
    filter.title = title ? title.split('|') : [];
    filter.platform = platform ? platform.split('|') : [];
    filter.publisher = publisher ? publisher.split('|') : [];
    filter.from = range ? range.split('|')[0] : '';
    filter.to = range ? range.split('|')[1] : '';
    return filter;
  }
  public toJson() {
    let output = [];
    if (this.title.length > 0) {
      this.title.forEach(element => {
        output.push({ title: element });
      });
    }

    if (this.platform.length > 0) {
      this.platform.forEach(element => {
        output.push({ platform: element });
      });
    }

    if (this.publisher.length > 0) {
      this.publisher.forEach(element => {
        output.push({ publisher: element });
      });
    }

    if (this.from) {
      output.push({ from: this.from });
    }

    if (this.to) {
      output.push({ to: this.to });
    }

    return output;
  }
  public setPlatform(platform: string) {
    this.platform.push(platform);
  }
  public setPublisher(publisher: string) {
    this.publisher.push(publisher);
  }
  public setTitle(title: string) {
    title = title.replace(/&/g, '%26');
    this.title.push(title);
  }
  public setFrom(from: string) {
    this.from = from;
  }
  public setTo(to: string) {
    this.to = to;
  }
  public getString(): string {
    let outString = '';
    if (this.platform.length > 0) {
      outString += '<strong> Platform: </strong>' + this.platform.join(', ');
    }
    if (this.publisher.length > 0) {
      outString += '<strong> Publisher: </strong>' + this.publisher.join(', ');
    }
    if (this.title.length > 0) {
      outString += '<strong> Title: </strong>' + this.title.join(', ');
    }
    if (this.from) {
      outString += '<strong> From: </strong>' + this.from;
      if (this.to) {
        outString += '<strong> To: </strong>' + this.to;
      } else {
        const now: Date = new Date();

        outString +=
          '<strong> To: </strong>' +
          now.getFullYear() +
          '-' +
          now.getMonth() +
          '-' +
          now.getDay();
      }
    }

    return outString;
  }

  public getFilterURL(): string {
    let output = [];
    let range = '';
    if (this.title.length > 0) {
      output.push('title=' + this.title.join('|'));
    }
    if (this.platform.length > 0) {
      output.push('platform=' + this.platform.join('|'));
    }
    if (this.publisher.length > 0) {
      output.push('publisher=' + this.publisher.join('|'));
    }
    if (this.from) {
      range = this.from;
      if (this.to) {
        range += '|' + this.to;
      } else {
        const now: Date = new Date();
        range +=
          '|' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay();
      }
      output.push('range=' + range);
    }
    return output.join('&');
  }

  public countItem(): number {
    let a;
    let b;
    a = this.from ? 1 : 0;
    b = this.to ? 1 : 0;
    return (
      this.title.length + this.platform.length + this.publisher.length + a + b
    );
  }

  public getFilterObject(params: string): Filter {
    let title = '';
    let platform = '';
    let publisher = '';
    let range = '';
    let arrayParams = [];

    if (params) {
      arrayParams = params.split('&');
    }

    arrayParams.forEach(i => {
      const each = i.split('=');
      if (each[0] === 'title') {
        title = each[1];
      }
      if (each[0] === 'platform') {
        platform = each[1];
      }
      if (each[0] === 'publisher') {
        publisher = each[1];
      }
      if (each[0] === 'range') {
        range = each[1];
      }
    });
    return this.convertedObject(title, platform, publisher, range);
  }
}
