import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { ErrorStateMatcher } from '@angular/material/core';
import {
  FilterRecordService,
  FilterRecord,
  Filter,
  AuthService
} from 'src/app/core';
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
export class SaveModalBoxComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('');
  matcher = new MyErrorStateMatcher();
  now: string;
  fullDate = new Date().toLocaleDateString();
  arrFullDate = this.fullDate.split('/');
  filters: string;
  filterRecord: FilterRecord;
  constructor(
    public dialogRef: MatDialogRef<SaveModalBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Filter,
    private filterRecordService: FilterRecordService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.filters = this.data.getString();
    this.now =
      this.arrFullDate[2] +
      '-' +
      this.arrFullDate[0] +
      '-' +
      this.arrFullDate[1];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onSave(): void {
    this.filterRecord = new FilterRecord(
      this.nameFormControl.value,
      this.descriptionFormControl.value,
      this.data.getFilterURL(),
      this.auth.getUserName(),
      this.now,
      this.now
    );

    this.filterRecordService.save(this.filterRecord).subscribe(data => {
      console.log(data);
    });
  }
}
