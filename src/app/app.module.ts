import { NgModule, isDevMode } from '@angular/core';
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
import { CategoryComponent } from './components/category/category.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers } from 'src/app/reducers';
import { EntityDataModule, EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { UserDataService } from './services/user-data.service';
import { User } from './models/user.model';
import {EffectsModule} from '@ngrx/effects';
import { ChartsComponent } from './components/charts/charts.component';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

const entityMetadata:EntityMetadataMap = {
  User: {
    selectId: (user:User) => user.id
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPage,
    BudgetPage,
    NavbarComponent,
    PopupComponent,
    ProfilePage,
    InputComponent,
    CategoryComponent,
    ExpenseComponent,
    ChartsComponent,
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
    CanvasJSAngularChartsModule,
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
    StoreModule.forRoot(reducers, {
      metaReducers: metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability:true,
        strictActionSerializability:true
      }
    }),
    
    BrowserAnimationsModule,
    
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router',
      routerState: RouterState.Minimal
    }),
    EntityDataModule.forRoot(entityConfig),
    
    
  ],
  providers: [
    provideEnvironmentNgxMask(),
    UserDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private eds: EntityDefinitionService,
    private entity:EntityDataService,
    private userDataService:UserDataService){
      eds.registerMetadataMap(entityMetadata)
      entity.registerService('User', userDataService);
  }
}
