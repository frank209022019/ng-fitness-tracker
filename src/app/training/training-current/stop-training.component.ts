import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StopDialogData } from './training-current.component';

@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>{{ passedData.title }}</h1>
            <mat-dialog-content>
              <p>{{ passedData.message }}</p>
            </mat-dialog-content>
            <mat-dialog-actions [style.margin-bottom.px]="1" fxLayout="row" fxLayoutAlign="end center">
              <button mat-raised-button [mat-dialog-close]="false" color="accent">No</button>
              <button mat-raised-button [mat-dialog-close]="true" color="primary">Yes</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: StopDialogData) {}
}
