import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { LoanComponent } from './loans/loan/loan.component';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { LoadButtonComponent } from './loans/loan-list/load-button/load-button.component';
import { LoansComponent } from './loans/loan-list/loans/loans.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanComponent,
    LoanListComponent,
    LoadButtonComponent,
    LoansComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
