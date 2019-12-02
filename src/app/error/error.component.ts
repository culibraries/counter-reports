import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '../core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage = '';
  constructor(private route: ActivatedRoute, private alert: AlertService) {}

  ngOnInit() {
    this.alert.dismiss();
    this.route.params.subscribe(params => {
      if (params.code === '401' || params.code === '403') {
        this.errorMessage =
          'AUTHORIZATION ERROR<br><br> You are NOT authorize to access to this application';
      } else if (params.code === '0') {
        this.errorMessage =
          'NO INTERNET CONNECTION<br><br> Please retry when the internet connection is available.';
      } else {
        this.errorMessage =
          'ERROR<br><br> Please try again or submit a ticket.';
      }
    });
  }
}
