import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Loan } from './loan';

const API_URL = "http://localhost:8000"

@Injectable({ providedIn: 'root'})
export class LoanService {

    constructor(private http: HttpClient) { }

    listFromUser(id: number) {
        return this.http
            .get<Loan[]>(API_URL + '/account/' + id);
    }

    listFromUserPaginated(id: number, page: number) {
        const params = new HttpParams()
            .append('page', page.toString());

        return this.http
            .get<Loan[]>(API_URL + '/' + id, { params });
    }

    saveLoan(loan: Loan) {
        return this.http.post<Loan>(API_URL + '/account/', loan);
    }

}