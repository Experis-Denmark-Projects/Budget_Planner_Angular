import { Component, Input, OnInit, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseComponent } from '../expense/expense.component';
import { CategoryService } from 'src/app/services/category.service';
import { AppState } from '@auth0/auth0-angular';
import { Store, select } from '@ngrx/store';
import { addExpense, deleteExpense, setExpenses } from 'src/app/redux/actions/expenses.actions';
import { categoryTotalExpense, selectExpenses } from 'src/app/redux/selectors/expenses.selectors';
import { Observable } from 'rxjs'
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { updateCategory } from 'src/app/redux/actions/category.actions';
import { CategorySharing } from 'src/app/models/category-sharing';
import { MatDialog } from '@angular/material/dialog';
import { CategorySharePopupComponent } from '../category-share-popup/category-share-popup.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  @Input() category: Category = {};
  @Output() expenseChange:EventEmitter<void> = new EventEmitter
  @Output() deleteCategory:EventEmitter<void> = new EventEmitter
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  canAddExpense = true
  category$:Observable<Category> = new Observable<Category>()
  expenses$: Observable<Expense[]> = new Observable<Expense[]>
  total$: Observable<number> = new Observable<0>
  categorySharings$:Observable<CategorySharing[]> = new Observable<CategorySharing[]>

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])

  categoryForm = new FormGroup({
    name: this.name
  })

  constructor(
    private categoryService:CategoryService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private viewContainerRef:ViewContainerRef,
    private store:Store<AppState>,
    private dialog:MatDialog){}

  ngOnInit(){
    if(this.category.id){
      this.expenses$ = this.store.select(selectExpenses(this.category.id))
      this.total$ = this.total()
    }

    this.name.setValue(this.category.name ?? '');
  }

  // Compute Total Expense Amount
  total() {
   //return this.expenses.reduce((total, expense) => total + (expense.amount ?? 0), 0);
   return this.category.id ? this.store.select(categoryTotalExpense(this.category.id)) : new Observable<0>
  }

  // Create New Expense
  createExpense(){
    const expenseFactory = this.componentFactoryResolver.resolveComponentFactory(ExpenseComponent)
    let dynamicomponentRef: ComponentRef<any>
    dynamicomponentRef = this.viewContainerRef.createComponent(expenseFactory);
    this.canAddExpense = false
    dynamicomponentRef.instance.create.subscribe((expense:Expense) => {
      if(this.category.id){
        this.categoryService.postExpenseObservable({...expense, category: this.category.id}).subscribe((expense:Expense) => {
          this.store.dispatch(addExpense({expense}))
          
          dynamicomponentRef.destroy();
          this.canAddExpense = true
        })
      }else{
        console.log(`No Category Id`)
      }
    })
  }

  onRemoveExpense(expense:Expense){
    this.categoryService.deleteExpenseObservable(expense).subscribe({
      next: () => {
        if(this.category.id){
          this.store.dispatch(deleteExpense({expense}))
        }
      },
      error: () => {
        console.log('Could not delete expense')
      }
    })
  }

  removeCategory(){
    this.deleteCategory.emit();
  }

  onSubmit(){
    if(this.categoryForm.value && this.categoryForm.value.name){
      const updatedCategory = {...this.category, name: this.categoryForm.value.name}
      this.categoryService.putCategoryObservable(updatedCategory)
      .subscribe({
        next:() => {
          if(this.categoryForm.value && this.categoryForm.value.name){
            this.category = {...this.category, name: this.categoryForm.value.name}
            this.store.dispatch(updateCategory({category: {...this.category, name: this.categoryForm.value.name}}))
          }
        },
        error: () => {
          // Prompt the user that the changes could not be saved.
        }
      })
    }
  }

  onInputBlur(){
    if(this.categoryForm.valid){
      this.onSubmit();
    }
  }

  onExpenseChanged(){
    this.expenseChange.emit()
  }

  openShareCategoryDialog(){
    this.dialog.open(CategorySharePopupComponent, {
      id: `${this.category.id} Share Category Dialog`,
      width: '700px',
      height: '200px'
    })
  }

  calculateLastModifiedDays(): number {
    if (this.category.lastModified instanceof Date) {
      const currentDate = new Date().getTime();
      const timeDifference = currentDate - this.category.lastModified.getTime();
      return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    }
  
    return 0;
  }
  
}
