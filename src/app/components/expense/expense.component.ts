import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Expense } from 'src/app/models/expense.model';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {

  @Input() expense:Expense = {}
  @Input() control:FormControl = new FormControl();
  @Input() type:string = 'text'
  @Input() placeholder:string = ''
  @Input() format = ''

  constructor(){}

}
