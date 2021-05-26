import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Loan } from '../loan/loan';
import { LoanService } from '../loan/loan.service';

@Injectable({ providedIn: 'root'})
export class LoanListResolver implements Resolve<Observable<Loan[]>> {

    constructor(private service: LoanService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Loan[]> {
        const id = route.params.id;
        return this.service.listFromUserPaginated(id, 1);
    }
}