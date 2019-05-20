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
  AuthService,
  AlertService
} from 'src/app/core';

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
  created_at: string;
  updated_at: string;

  filters: string;
  filterRecord: FilterRecord;
  isBelongsToMe = false;
  isKeep = false;
  constructor(
    public dialogRef: MatDialogRef<SaveModalBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private filterRecordService: FilterRecordService,
    private auth: AuthService,
    private alert: AlertService
  ) {}

  isKeepOriginal(event) {
    this.isKeep = event.checked;
  }

  ngOnInit() {
    if (this.data.action === 'create') {
      if (!this.data.params) {
        this.filters = this.data.message.getString();
      } else {
        this.nameFormControl.setValue(this.data.message2.name);
        this.descriptionFormControl.setValue(this.data.message2.description);
        this.filters = this.data.message.getString();
        this.isBelongsToMe = this.auth.isUser(this.data.message2.owner);
      }
    }

    if (this.data.action === 'edit') {
      const filter = new Filter();
      this.nameFormControl.setValue(this.data.message.name);
      this.descriptionFormControl.setValue(this.data.message.description);
      this.filters = filter
        .getFilterObject(this.data.message.params)
        .getString();
    }

    this.now = new Date().toISOString().slice(0, 10);
  }

  onNoClick(): void {
    this.dialogRef.close('just-close');
  }

  onSave(): void {
    if (!this.nameFormControl.valid) {
      return;
    }
    try {
      if (this.data.action === 'create') {
        if (
          (this.isKeep && this.data.params) ||
          (!this.isKeep && !this.data.params) ||
          (!this.isKeep &&
            this.data.params &&
            !this.auth.isUser(this.data.message2.owner))
        ) {
          this.filterRecord = new FilterRecord(
            this.nameFormControl.value,
            this.descriptionFormControl.value,
            this.data.message.getFilterURL(),
            this.auth.getUserName(),
            this.now,
            this.now
          );
          this.filterRecordService
            .save(this.filterRecord)
            .subscribe(data => {});
        } else {
          this.filterRecord = new FilterRecord(
            this.nameFormControl.value,
            this.descriptionFormControl.value,
            this.data.message.getFilterURL(),
            this.data.message2.owner,
            this.data.message2.created_at,
            this.now
          );

          this.filterRecordService
            .update(this.filterRecord, this.data.message2.id)
            .subscribe(data => {});
        }
      }

      if (this.data.action === 'edit') {
        this.filterRecord = new FilterRecord(
          this.nameFormControl.value,
          this.descriptionFormControl.value,
          this.data.message.params,
          this.data.message.owner,
          this.data.message.created_at,
          this.now
        );

        this.filterRecordService
          .update(this.filterRecord, this.data.message.id)
          .subscribe(data => {});
      }
      this.alert.success('Great ! You have got it');
      this.dialogRef.close();
    } catch (error) {
      this.alert.danger('Oops ! Something went wrong');
    }
  }
}
