import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { BudgetPage } from './pages/budget/budget.page';
import { ProfilePage } from './pages/profile/profile.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'budget',
    component: BudgetPage
  },
  {
    path: 'profile',
    component: ProfilePage
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
