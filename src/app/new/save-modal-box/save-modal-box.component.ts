import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-save-modal-box',
  templateUrl: './save-modal-box.component.html',
  styleUrls: ['./save-modal-box.component.css']
})
export class SaveModalBoxComponent {
  constructor(public dialogRef: MatDialogRef<SaveModalBoxComponent>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
