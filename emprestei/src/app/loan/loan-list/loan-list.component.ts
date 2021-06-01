import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoanService } from '../loan.service';
import { Loan } from '../loan';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  loanForm: FormGroup;
  @ViewChild('loanInput') emailInput: ElementRef<HTMLInputElement>;

  private idUser: number = 0;
  public loansList: Loan[];
  private loan: Loan[];

  constructor( 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private loanService: LoanService) {
    this.route.params.subscribe(params => this.idUser = params['user']);
  }

  ngOnInit(): void {
    this.loanService.loadLoansByUser(this.idUser).subscribe(res => {
      this.loansList = res
    }, err => {
      alert('Erro ao carregar os empréstimos!');
    });
  }

  loadLoan(idLoan: number) {

    this.loanService.loadLoan(idLoan).subscribe(res => {
      this.loan = res
    }, err => {
      alert('Erro ao carregar o empréstimo!');
    });
    
    return console.log(this.loan);
  }

  formatStringDataToDisplay(data) {
    var ano  = data.split("-")[0];
    var mes  = data.split("-")[1];
    var dia  = data.split("-")[2];
  
    return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }
}
