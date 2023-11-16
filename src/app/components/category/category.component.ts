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

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  @Input() category: Category = {};
  @Input() expenses: Expense[] = [];
  @Output() expenseChange:EventEmitter<number> = new EventEmitter
  @Output() deleteCategory:EventEmitter<void> = new EventEmitter
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  canAddExpense = true
  expenses$: Observable<Expense[]> = new Observable<Expense[]>
  total$: Observable<number> = new Observable<0>

  constructor(
    private categoryService:CategoryService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private viewContainerRef:ViewContainerRef,
    private store:Store<AppState>){}

  ngOnInit(){
    if(this.category.id){
      this.expenses$ = this.store.select(selectExpenses(this.category.id))
      this.total$ = this.total()
    }
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
          this.expenses.push(expense)
          this.store.dispatch(addExpense({expense}))
          
          if(this.category.id){
            this.expenses$ = this.store.select(selectExpenses(this.category.id))
          }
          
          dynamicomponentRef.destroy();
          this.canAddExpense = true
          //this.expenseChange.emit(this.total())
        })
      }else{
        console.log(`No Category Id`)
      }
    })
  }

  onRemoveExpense(expense:Expense){
    this.categoryService.deleteExpenseObservable(expense).subscribe({
      next: () => {
        //this.expenseChange.emit(this.total())
        if(this.category.id){
          //this.expenses = this.expenses.filter(item => item.id !== expense.id)
          this.store.dispatch(deleteExpense({expense}))
          this.expenses$ = this.store.select(selectExpenses(this.category.id))
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
}
