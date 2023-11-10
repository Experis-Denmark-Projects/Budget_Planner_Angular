import { Component, Input, OnInit, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Expense } from 'src/app/models/expense.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ExpenseComponent } from '../expense/expense.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  @Input() category: Category = {};
  @Input() expenses: Expense[] = [];

  canAddExpense:boolean = true

  constructor(private userService:UserService, 
              private auth:AuthService,
              private componentFactoryResolver:ComponentFactoryResolver,
              private viewContainerRef:ViewContainerRef){}

  ngOnInit(){
    
  }

  total() {
   return this.expenses.reduce((total, expense) => total + (expense.amount ?? 0), 0);
  }

  addExpense(){
    const expenseFactory = this.componentFactoryResolver.resolveComponentFactory(ExpenseComponent)
    let dynamicomponentRef: ComponentRef<any>
    dynamicomponentRef = this.viewContainerRef.createComponent(expenseFactory);

    dynamicomponentRef.instance.remove.subscribe((expense:any) => this.onRemoveExpense(expense))
  }

  onRemoveExpense(expense:Expense){
    this.userService.deleteExpenseObservable(expense).subscribe({
      next: () => {},
      error: () => {}
    })
  }
}
