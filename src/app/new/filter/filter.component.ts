import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { SaveModalBoxComponent } from '../save-modal-box/save-modal-box.component';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  items: number[] = [];
  show: boolean;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {
    this.show = false;
  }

  ngOnInit() {}
  activeFilter() {
    this.items.push(this.items.length);
    this.show = true;
  }
  increment() {
    this.items.push(this.items.length);
  }
  decrement(item: number) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
    console.log(this.items);
    if (this.items.length === 0) {
      this.show = false;
    }
  }

  openSaveModal() {
    const dialogRef = this.dialog.open(SaveModalBoxComponent, {
      width: '500px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
