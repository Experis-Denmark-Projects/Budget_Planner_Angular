import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginPage } from './pages/login/login.page';
import { BudgetPage } from './pages/budget/budget.page';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    BudgetPage,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    AuthModule.forRoot({
      domain: 'dev-nw60en5uln7ga8bc.us.auth0.com',
      clientId: 'lmLrN3b6iyLrqmQedKT3fAwJbY6rTunQ',
      authorizationParams: {
        redirect_uri: `${window.location.origin}`,
        audience: `https://budget-planner`
      },
      useRefreshTokensFallback: true,
      cacheLocation: 'localstorage'
    })
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
