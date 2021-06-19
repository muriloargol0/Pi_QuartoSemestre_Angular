import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';
import { Loan } from './loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  loadLoansByUser(idUser: number) {
    return this.http.get<Loan[]>(API_URL + `/loan/?${idUser}`);
  }

  loadLoan(idLoan: number) {
    return this.http.get<Loan[]>(API_URL + `/loan/?loan=${idLoan}`);
  }

  returnLoan(loan: Loan) {
    let formData: FormData = new FormData();
    formData.append("acc_id", loan.acc_id.toString());
    formData.append("loan_to_name", loan.loan_to_name);
    formData.append("loan_description", loan.loan_description);
    formData.append("loan_date", loan.loan_date.toString());
    formData.append("loan_observation", loan.loan_observation);
    formData.append("loan_return_date", loan.loan_return_date == null ? "" : loan.loan_return_date.toString());
    formData.append("loan_estimated_value", loan.loan_estimated_value.toString());

    return this.http.put<Loan>(API_URL + `/loan/${loan.id}/`, formData);
  }
  
  saveLoan(loan: Loan) {
    return this.http.post<Loan>(API_URL + `/loan/`, loan);
  }

  updateLoan(loan: Loan) {
    let formData: FormData = new FormData();
    formData.append("acc_id", loan.acc_id.toString());
    formData.append("loan_to_name", loan.loan_to_name);
    formData.append("loan_description", loan.loan_description);
    formData.append("loan_date", loan.loan_date.toString());
    formData.append("loan_observation", loan.loan_observation);
    formData.append("loan_estimated_value", loan.loan_estimated_value.toString());

    return this.http.put<Loan>(API_URL + `/loan/${loan.id}/`, formData);
  }
}
