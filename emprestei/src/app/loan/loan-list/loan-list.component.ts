import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoanService } from '../loan.service';
import { Loan } from '../loan';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  providers: [DatePipe],
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  loanForm: FormGroup;
  @ViewChild('loanInput') emailInput: ElementRef<HTMLInputElement>;

  private idUser: number = 0;
  public loansList: Loan[];

  constructor( 
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router, 
    private loanService: LoanService,
    private datePipe: DatePipe) {
    this.route.params.subscribe(params => this.idUser = params['user']);
  }

  ngOnInit(): void {
    this.loanService.loadLoansByUser(this.idUser).subscribe(res => {
      this.loansList = res
    }, err => {
      alert('Erro ao carregar os empréstimos!');
    });
  }

  returnLoan(idLoan: number){
    let loan = this.loansList.find(l => l.id == idLoan);
    var date = new Date();
    loan.loan_return_date = date.toISOString().split('T')[0]
    console.log(loan.loan_return_date);
    this.loanService.returnLoan(loan).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      alert('Não foi possível realizar a devolução!');
    });
  }

  undoReturnLoan(idLoan: number){
    let loan = this.loansList.find(l => l.id == idLoan);
    loan.loan_return_date = null; 

    this.loanService.returnLoan(loan).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      alert('Não foi possível desfazer a devolução!');
    });
  }

  loanDetails(idLoan: number): void {
    this.router.navigate([`../loan/edit/${idLoan}`]);
  }

  formatStringDataToDisplay(data) {
    if(data != null){
      var ano  = data.split("-")[0];
      var mes  = data.split("-")[1];
      var dia  = data.split("-")[2];
  
      return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
    }
    
    return "Data não informada";
  }
}
