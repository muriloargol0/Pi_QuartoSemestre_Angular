import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { CoreModule } from './core/core.module';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { LoanEditComponent } from './loan/loan-edit/loan-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoanListComponent,
    LoanEditComponent,
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
