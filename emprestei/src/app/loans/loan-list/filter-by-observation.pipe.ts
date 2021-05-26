import { Pipe, PipeTransform } from '@angular/core';
import { Loan } from '../loan/loan';

@Pipe({ name: 'filterByObservation'})
export class FilterByObservation implements PipeTransform {

    transform(loans: Loan[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery
            .trim()
            .toLowerCase()

        if (descriptionQuery) {
            return loans.filter(loan => 
                loan.loan_observation.toLowerCase().includes(descriptionQuery)
            );
        } else {
            return loans;
        }
    }
}