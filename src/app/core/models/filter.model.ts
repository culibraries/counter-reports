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
  public setPlatform(platform: string) {
    this.platform.push(platform);
  }
  public setPublisher(publisher: string) {
    this.publisher.push(publisher);
  }
  public setTitle(title: string) {
    title = title.replace(/&/g, '%26').replace(/ /g, '%20');
    this.title.push(title);
  }
  public setFrom(from: string) {
    this.from = from;
  }
  public setTo(to: string) {
    this.to = to;
  }
  getString() {}

  getFilterURL(): string {
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
        let now: Date = new Date();
        range +=
          '|' + now.getFullYear() + '-' + now.getMonth() + '-' + now.getDay();
      }
      output.push('range=' + range);
    }

    return output.join('&');
  }
}
