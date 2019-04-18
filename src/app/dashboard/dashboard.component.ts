import { Component, OnInit } from '@angular/core';
import { PlatformService, PublisherService, TitleService } from '../core';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  publicationTotal: number;
  publisherTotal: number;
  platformTotal: number;
  constructor(
    private platformService: PlatformService,
    private publisherService: PublisherService,
    private titleService: TitleService
  ) {}

  ngOnInit() {
    this.platformService.getAll().subscribe(data => {
      this.platformTotal = data.length;
    });

    this.publisherService.getAll().subscribe(data => {
      this.publisherTotal = data.length;
    });

    this.titleService.getAll().subscribe(data => {
      this.publicationTotal = data.length;
    });
  }
}
