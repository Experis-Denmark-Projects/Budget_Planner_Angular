import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { catchError, of } from 'rxjs';
import { CategorySharing } from 'src/app/models/category-sharing';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-share-popup',
  templateUrl: './category-share-popup.component.html',
  styleUrls: ['./category-share-popup.component.css']
})
export class CategorySharePopupComponent implements OnInit{
  constructor(
    private categoryService:CategoryService,
    private store:Store,
    @Inject(MAT_DIALOG_DATA) public data:any){}

  ngOnInit(): void {
      console.log(`Category ID: ${this.data.category.id}, User ID: ${this.data.category.user}`)
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  sharingForm = new FormGroup({
    email:this.email
  })

  sendRequest(){
    
    if(this.data?.category && this.sharingForm.value.email){
      const categorySharing:CategorySharing = {
        sharedUserEmail: this.sharingForm.value.email,
        accepted: false,
        category: this.data.category.id,
        user: this.data.category.user,
      }
      this.categoryService.postCategorySharingObservable(categorySharing)
      .subscribe({
        next:(categorySharing:CategorySharing) => {
          // Dispatch Category Sharing Action in Redux Store.
          
        },
        error: () => {
          // Prompt user that their request could not be made.
        }
      })
    }
  }
}
