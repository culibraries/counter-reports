import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert, AlertType } from '../../core';
import { AlertService } from '../services';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}
  private timeSubscribe$: Subscription;
  ngOnInit() {
    this.alertService.getAlert().subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = [];
        return;
      }
      this.alerts.push(alert);
      const time = timer(2000);
      this.timeSubscribe$ = time.subscribe(val => this.alerts.pop());
    });
  }
  ngOnDestroy(): void {
    if (this.timeSubscribe$) {
      this.timeSubscribe$.unsubscribe();
    }
  }
  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(x => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
