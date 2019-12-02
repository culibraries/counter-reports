import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { ErrorStateMatcher } from '@angular/material/core';
import {
  FilterRecordService,
  FilterRecord,
  Filter,
  AuthService,
  AlertService,
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
  styleUrls: ['./save-modal-box.component.css'],
})
export class SaveModalBoxComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  descriptionFormControl = new FormControl('');
  matcher = new MyErrorStateMatcher();
  now = new Date().toISOString().slice(0, 10);
  created_at: string;
  updated_at: string;

  filterStringDisplay: string;
  filterRecord: FilterRecord;

  isBelongsToMe = false;
  isKeepOriginal = false;

  constructor(
    public dialogRef: MatDialogRef<SaveModalBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private filterRecordService: FilterRecordService,
    private auth: AuthService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    if (this.data.action === 'save') {
      // Brand new save filter
      if (this.data.isBrandNewSaveFilter) {
        this.filterStringDisplay = this.data.filterDisplay;
      } else {
        // Save filter when user select a filter record from view/run: load all related data to the form
        this.nameFormControl.setValue(this.data.filterRecord.name);
        this.descriptionFormControl.setValue(
          this.data.filterRecord.description
        );
        this.filterStringDisplay = this.data.filterDisplay;
        this.isBelongsToMe = this.auth.isUser(this.data.filterRecord.owner);
      }
    }

    if (this.data.action === 'edit') {
      this.nameFormControl.setValue(this.data.filterRecord.name);
      this.descriptionFormControl.setValue(this.data.filterRecord.description);
      this.filterStringDisplay = new Filter()
        .getFilterObject(this.data.filterRecord.params)
        .getString();
    }
  }

  onNoThanks(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    // Validate Name of filter
    if (!this.nameFormControl.valid) {
      return;
    }

    if (this.data.action === 'save') {
      if (this.isSaveNewFilter()) {
        this.filterRecordService
          .save(
            new FilterRecord(
              this.nameFormControl.value,
              this.descriptionFormControl.value,
              this.data.filterParams, // filters
              this.auth.getUserName(), // Owner
              this.now,
              this.now
            )
          )
          .subscribe(() => {
            this.alert.success('Great ! It is saved !');
          });
      } else {
        this.filterRecordService
          .update(
            new FilterRecord(
              this.nameFormControl.value,
              this.descriptionFormControl.value,
              this.data.filterParams,
              this.data.filterRecord.owner,
              this.data.filterRecord.created_at,
              this.now
            ),
            this.data.filterRecord.id
          )
          .subscribe(() => {
            this.alert.success('Great ! It is saved !');
          });
      }
    }

    if (this.data.action === 'edit') {
      this.filterRecordService
        .update(
          new FilterRecord(
            this.nameFormControl.value,
            this.descriptionFormControl.value,
            this.data.filterRecord.params,
            this.data.filterRecord.owner,
            this.data.filterRecord.created_at,
            this.now
          ),
          this.data.filterRecord.id
        )
        .subscribe(() => {
          this.alert.success('Great ! It is saved !');
        });
    }
    this.dialogRef.close();
  }

  /**
   * Determines whether if the 'Save' action is Creating new filterRecord
   * when isBrandNewSaveFilter passed.
   * when user want to keep the original record.
   * when user want to save record which is not belongs to them => new record.
   * @returns true if save new filter
   */
  private isSaveNewFilter(): boolean {
    if (this.data.isBrandNewSaveFilter) {
      return true;
    }
    if (this.isKeepOriginal) {
      return true;
    }
    if (!this.auth.isUser(this.data.filterRecord.owner)) {
      return true;
    }
    return false;
  }
}
