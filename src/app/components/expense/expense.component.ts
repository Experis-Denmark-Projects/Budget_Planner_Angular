import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/models/expense.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit{

  @Input() expense:Expense = {}
  @Input() canDelete:boolean = false
  @Output() create = new EventEmitter<Expense>()
  @Output() remove = new EventEmitter<Expense>()

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])

  amount = new FormControl(0, [
    Validators.required,
  ])

  expenseForm = new FormGroup({
    name: this.name,
    amount: this.amount
  })

  constructor(private userService:UserService){}

  ngOnInit(): void {
      this.synchronizeExpenseFormWithInputValues()
  }

  onSubmit(){
    
    if(this.expenseForm.value && this.expenseForm.value.name && this.expenseForm.value.amount){
      const updatedExpense = {...this.expense, name: this.expenseForm.value.name, amount: this.expenseForm.value.amount}
      this.userService.putExpenseObservable(updatedExpense)
      .subscribe({
        next: () => {
          // Prompt user that the changes has been made
          this.expense = updatedExpense
        },
        error: () => {
          // Prompt user that changes could not be made
          console.log('Could not update expense')
        }
      })
    } 
  }

  onInputBlur(){
    if(this.expenseForm.valid && this.canDelete){
      this.onSubmit()
    }
  }

  delete(){
    this.remove.emit(this.expense)
  }

  add(){
    if(this.expenseForm.valid && this.expenseForm.value.name && this.expenseForm.value.amount){
      this.create.emit({
        name: this.expenseForm.value.name,
        amount: this.expenseForm.value.amount
      })
    }
  }

  synchronizeExpenseFormWithInputValues(){
    this.name.setValue(this.expense.name ?? '')
    this.amount.setValue(this.expense.amount ?? 0)
  }
}
