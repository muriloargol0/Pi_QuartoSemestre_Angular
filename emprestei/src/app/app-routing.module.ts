import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './home/signin/signin.component';
import { SignUpComponent } from './home/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
import { LoanListComponent } from './loans/loan-list/loan-list.component';
import { LoanListResolver } from './loans/loan-list/loan-list.resolver';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: SignInComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
    ]
  },
  {
    path: 'account/:id',
    component: LoanListComponent,
    resolve: {
      loans: LoanListResolver
    }
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
