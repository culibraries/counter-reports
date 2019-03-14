import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-save-modal-box',
  templateUrl: './save-modal-box.component.html',
  styleUrls: ['./save-modal-box.component.css']
})
export class SaveModalBoxComponent {
  saveFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();
  constructor(public dialogRef: MatDialogRef<SaveModalBoxComponent>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
