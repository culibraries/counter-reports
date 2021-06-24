import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Config } from '../config';

const durationTime = Config.snackBar.duration;

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  danger(message: string) {
    return this.alert('alert-danger', message);
  }

  success(message: string) {
    return this.alert('alert-success', message);
  }

  warn(message: string) {
    return this.alert('alert-warn', message);
  }

  default(message: string) {
    return this.alert('alert-default', message);
  }

  loading(message: string) {
    return this.alertWithoutTime('alert-default', message);
  }

  private alert(type: string, message: string) {
    return this.snackBar.open(message, '', {
      duration: durationTime,
      panelClass: [type],
      horizontalPosition: 'left'
    });
  }

  private alertWithoutTime(type: string, message: string) {
    return this.snackBar.open(message, '', {
      panelClass: [type],
      horizontalPosition: 'left'
    });
  }

  dismiss() {
    this.snackBar.dismiss();
  }
}
