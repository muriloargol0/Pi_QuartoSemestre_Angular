import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LoanComponent } from './loan.component';

@NgModule({ 
    declarations: [LoanComponent],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [LoanComponent]
})
export class LoanModule { }