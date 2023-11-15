import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import { AppState } from '@auth0/auth0-angular';
import { addCategory, setCategories } from 'src/app/redux/actions/category.actions';
import { selectCategories, selectCategoriesState } from 'src/app/redux/selectors/categories.selectors';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.page.html',
  styleUrls: ['./budget.page.css']
})
export class BudgetPage implements OnInit {

  categories:Category[] = []
  categories$: Observable<Category[]> = new Observable<Category[]>
  budgetRemainder:number = 0
  // Form Controls
  name = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ])

  categoryForm = new FormGroup({
    name: this.name
  })

  constructor(
    public readonly categoryService:CategoryService,
    public readonly auth:AuthService,
    private store: Store<AppState>){}

  ngOnInit(): void {
    // On LoginWithRedirect this component is rendered before http requests are done fethcing.
    // Do not call categories get request if the user has not been fetched and set yet. 
    if(this.auth.User.id){
      this.categoryService.getCategoriesObservable().subscribe((categories:Category[]) => {
        this.store.dispatch(setCategories({categories}));
        this.categories$ = this.store.select(selectCategories())
      })
    }
  }

  addCategory(){
    const category = {
      user: this.auth.User.id,
      name: this.categoryForm.value.name,
      expenses: []
    }
    this.categoryService.postCategoryObservable(category).subscribe(
      ((category:Category) => {
        this.store.dispatch(addCategory({category}))
        this.categories$ = this.store.select(selectCategories())
      })
    )
  }
}
