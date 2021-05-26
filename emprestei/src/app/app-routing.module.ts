import { LoanListComponent } from './loan/loan-list/loan-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './home/signin/signin.component';
import { SignUpComponent } from './home/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './core/auth/auth.guard';
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
    path: 'loan/:user',
    component: LoanListComponent
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
