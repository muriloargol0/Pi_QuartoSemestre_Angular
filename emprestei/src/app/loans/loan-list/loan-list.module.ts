import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { LoanComponent } from '../loan/loan.component';
import { LoanModule } from '../loan/loan.module';
import { FilterByObservation } from './filter-by-observation.pipe';
import { LoadButtonComponent } from './load-button/load-button.component';
import { LoanListComponent } from './loan-list.component';
import { SearchComponent } from './search/search.component';

@NgModule ({
    declarations: [
        LoanListComponent,
        LoanComponent,
        LoadButtonComponent,
        FilterByObservation,
        SearchComponent       
    ],
    imports: [
        CommonModule,
        LoanModule,
        CardModule        
    ]
})
export class LoanListModule { }