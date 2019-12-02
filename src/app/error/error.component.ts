import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService, ApiService } from '../core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  errorMessage = '';
  constructor(
    private route: ActivatedRoute,
    private alert: AlertService,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.alert.dismiss();
    this.route.params.subscribe(params => {
      if (params.code === '403') {
        this.apiService.logout('/api-auth/logout/').subscribe(() => {
          console.log('You are logged out!');
        });
        this.errorMessage =
          'AUTHORIZATION ERROR<br><br> You are NOT authorize to access to this application';
      } else {
        this.errorMessage =
          'ERROR<br><br> Please try again or submit a ticket.';
      }
    });
  }
}
