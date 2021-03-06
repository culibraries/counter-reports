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
    platform = platform.trim();
    this.platform.push(escape(platform));
  }

  public setPublisher(publisher: string) {
    publisher = publisher.trim();
    this.publisher.push(escape(publisher));
  }

  public setTitle(title: string) {
    title = title.trim();
    this.title.push(escape(title));
  }

  public getTitle(title: string) {
    return unescape(title);
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
      outString += '<strong> Platform: </strong>';
      this.platform.forEach((e, i, arr) => {
        outString +=
          ' <strong>[' + e.split('*.')[0] + ']</strong> ' + e.split('*.')[1];
      });
    }
    if (this.publisher.length > 0) {
      outString += '<strong> Publisher: </strong>';
      this.publisher.forEach((e, i, arr) => {
        outString +=
          ' <strong>[' + e.split('*.')[0] + ']</strong> ' + e.split('*.')[1];
      });
    }
    if (this.title.length > 0) {
      outString += '<strong> Title: </strong>';
      this.title.forEach((e, i, arr) => {
        outString +=
          ' <strong>[' + e.split('*.')[0] + ']</strong> ' + e.split('*.')[1];
      });
    }
    if (this.from) {
      outString += ' <strong> From: </strong> ' + this.from;
      if (this.to) {
        outString += ' <strong> To: </strong> ' + this.to;
      } else {
        const now: Date = new Date();

        outString +=
          ' <strong> To: </strong> ' + now.toISOString().slice(0, 10);
      }
    }

    return unescape(outString);
  }

  public getFilterURL(): string {
    const output = [];
    let range = '';
    if (this.title.length > 0) {
      output.push(
        'title=' + this.title.map((e, i, arr) => escape(unescape(e))).join('|')
      );
    }
    if (this.platform.length > 0) {
      output.push(
        'platform=' +
          this.platform.map((e, i, arr) => escape(unescape(e))).join('|')
      );
    }
    if (this.publisher.length > 0) {
      output.push(
        'publisher=' +
          this.publisher.map((e, i, arr) => escape(unescape(e))).join('|')
      );
    }
    if (this.from) {
      range = this.from;
      if (this.to) {
        range += '|' + this.to;
      } else {
        const now: Date = new Date();
        range += '|' + now.toISOString().slice(0, 10);
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
        title = each[1].trim();
      }
      if (each[0] === 'platform') {
        platform = each[1].trim();
      }
      if (each[0] === 'publisher') {
        publisher = each[1].trim();
      }
      if (each[0] === 'range') {
        range = each[1].trim();
      }
    });

    return this.convertedObject(title, platform, publisher, range);
  }
}
