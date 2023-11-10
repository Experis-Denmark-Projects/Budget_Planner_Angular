import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/models/expense.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent {

  @Input() expense:Expense = {}
  @Output() remove = new EventEmitter<Expense>()

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])

  amount = new FormControl('', [
    Validators.required,
  ])

  expenseForm = new FormGroup({
    name: this.name,
    amount: this.amount
  })

  constructor(){}

  delete(){
    this.remove.emit(this.expense)
  }
}
