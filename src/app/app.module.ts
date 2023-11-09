import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginPage } from './pages/login/login.page';
import { BudgetPage } from './pages/budget/budget.page';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PopupComponent } from './popup/profile-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilePage } from './pages/profile/profile.page';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideEnvironmentNgxMask, NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    BudgetPage,
    NavbarComponent,
    PopupComponent,
    ProfilePage,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    MatDialogModule,
    AuthModule.forRoot({
      domain: 'dev-nw60en5uln7ga8bc.us.auth0.com',
      clientId: 'lmLrN3b6iyLrqmQedKT3fAwJbY6rTunQ',
      authorizationParams: {
        redirect_uri: `${window.location.origin}/budget`,
        audience: `https://budget-planner`
      },
      useRefreshTokensFallback: true,
      cacheLocation: 'localstorage'
    }),
    BrowserAnimationsModule
  ],
  providers: [
    provideEnvironmentNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
