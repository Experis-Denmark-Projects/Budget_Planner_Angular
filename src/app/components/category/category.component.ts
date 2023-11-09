import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { Expense } from 'src/app/models/expense.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  @Input() category: Category = {};
  @Input() expenses: Expense[] = [];
  categoryTotal:number = 0

  ngOnInit(){
    
  }

  total() {
    this.categoryTotal = this.expenses.reduce((total, expense) => total + (expense.amount ?? 0), 0);
  }
}
