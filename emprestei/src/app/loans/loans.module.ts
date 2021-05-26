import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoanListModule } from './loan-list/loan-list.module';
import { LoanModule } from './loan/loan.module';
import { LoanFormComponent } from './loan-form/loan-form.component';
import { LoanFormModule } from './loan-form/loan-form.module';

@NgModule({
    imports: [
        LoanModule,
        LoanFormModule,
        LoanListModule,
        CommonModule        
    ],
    declarations: [LoanFormComponent]
})
export class LoansModule { }