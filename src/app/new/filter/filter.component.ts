import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  items: number[] = [];
  show: boolean;
  constructor() {
    this.show = false;
  }

  ngOnInit() {}
  activeFilter() {
    this.items.push(this.items.length);
    this.show = true;
  }
  increment() {
    this.items.push(this.items.length);
  }
  decrement(item) {
    this.items.splice(item);
    if (this.items.length === 0) {
      this.show = false;
    }
  }
}
