import { Component, OnInit } from '@angular/core';
import { StaticService } from '../core';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  publicationTotal: number;
  publisherTotal: number;
  platformTotal: number;

  constructor(private staticService: StaticService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      this.staticService.get().subscribe(data => {
        this.platformTotal = data['platform_count'];
        this.publicationTotal = data['title_count'];
        this.publisherTotal = data['publisher_count'];
      });
      this.spinner.hide();
    }, 2000);

  }
}
