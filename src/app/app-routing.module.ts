import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { BudgetPage } from './pages/budget/budget.page';
import { ProfilePage } from './pages/profile/profile.page';
import { AuthGuard } from '@auth0/auth0-angular';
import { BudgetResolver } from './redux/resolvers/budget.resolver';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'budget',
    component: BudgetPage,
    canActivate: [AuthGuard],
    resolve: {
      categories: BudgetResolver
    }
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
