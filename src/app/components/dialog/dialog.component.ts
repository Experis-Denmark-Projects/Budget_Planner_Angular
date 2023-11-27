import { Component, Inject, Injector, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DynamicContentComponent } from '../dynamic-content/dynamic-content.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @ViewChild(DynamicContentComponent, {static: true}) dynamicContent!: DynamicContentComponent;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){}

  closeDialog():void{
    this.dialogRef.close();
  }

  ngAfterViewInit(){
    this.dynamicContent.loadComponent(this.data.componentData.component);
  }
}
