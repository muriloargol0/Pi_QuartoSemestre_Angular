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
      return this.http.get<Loan[]>(API_URL + `/loan/?user=${idUser}`);
  }
  
}
