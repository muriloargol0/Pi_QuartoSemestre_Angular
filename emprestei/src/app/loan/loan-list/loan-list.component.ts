import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { Loan } from '../loan';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  private idUser: number = 0;
  public loansList: Loan[];

  constructor( private route: ActivatedRoute, private loanService: LoanService) {
    this.route.params.subscribe(params => this.idUser = params['user']);
  }

  ngOnInit(): void {
    this.loanService.loadLoansByUser(this.idUser).subscribe(res => {
      this.loansList = res
    }, err => {
      alert('Erro ao carregar os empréstimos!');
    });
  }

}
