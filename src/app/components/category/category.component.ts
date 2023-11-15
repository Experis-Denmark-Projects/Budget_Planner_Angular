import { Component, Input, OnInit, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Expense } from 'src/app/models/expense.model';
import { ExpenseComponent } from '../expense/expense.component';
import { CategoryService } from 'src/app/services/category.service';
import { AppState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { setExpenses } from 'src/app/redux/actions/expenses.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  @Input() category: Category = {};
  @Input() expenses: Expense[] = [];
  @Output() expenseChange:EventEmitter<number> = new EventEmitter
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer!: ViewContainerRef;
  canAddExpense = true

  constructor(
    private categoryService:CategoryService,
    private componentFactoryResolver:ComponentFactoryResolver,
    private viewContainerRef:ViewContainerRef,
    private store:Store<AppState>){}

  ngOnInit(){
    
  }

  // Compute Total Expense Amount
  total() {
   return this.expenses.reduce((total, expense) => total + (expense.amount ?? 0), 0);
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
          this.store.dispatch(setExpenses({expenses: this.expenses}))
          dynamicomponentRef.destroy();
          this.canAddExpense = true
          this.expenseChange.emit(this.total())
        })
      }else{
        console.log(`No Category Id`)
      }
    })
  }

  onRemoveExpense(expense:Expense){
    this.categoryService.deleteExpenseObservable(expense).subscribe({
      next: () => {
        this.expenses = this.expenses.filter(item => item.id !== expense.id)
        this.expenseChange.emit(this.total())
      },
      error: () => {
        console.log('Could not delete expense')
      }
    })
  }
}
