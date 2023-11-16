import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AppState } from '@auth0/auth0-angular';
import { Store } from '@ngrx/store';
import { Observable, map, switchMap, take, Subscription, catchError, of  } from 'rxjs';
import { setUser } from 'src/app/redux/actions/user.actions';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { selectUser } from 'src/app/redux/selectors/user.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.css']
})
export class ProfilePage implements OnInit{
  user?: User;
  user$:Observable<User> = new Observable<User>
  private userSubscription: Subscription | undefined;
  // Form Controls
  totalBudget = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    
  ])

  userForm = new FormGroup({
    totalBudget: this.totalBudget
  })

  constructor(
    private readonly userService:UserService, 
    private readonly auth:AuthService,
    private store:Store<AppState>){}

  ngOnInit(){
    this.user$ = this.store.select(selectUser());
  }

  setTotalBudget(){
    let updatedUser = {} // Temporary User
    const newTotalBudget = Number(this.userForm.get('totalBudget')?.value);
    this.user$.pipe(
      take(1)
    ).subscribe((user:User) => {
      updatedUser = {...user, totalBudget:newTotalBudget}
      this.userService.putUserObservable(updatedUser).subscribe(response => {
        if(!response){
          this.store.dispatch(setUser({user:updatedUser}))
        }else{
          // Prompt user that changes could not be saved!
        }
      })
    })
  }
  
  ngOnDestroy(){
    this.userSubscription = this.store.select(selectUser()).subscribe((user) => this.user = user)
  }
}
