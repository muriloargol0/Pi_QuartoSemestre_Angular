import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Loan } from '../loan/loan';
import { LoanService } from '../loan/loan.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {

  loans: Loan[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';
  id: number;  

  constructor(
    private activatedRoute: ActivatedRoute,
    private loanService: LoanService
  ) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.loans = this.activatedRoute.snapshot.data['loans'];
  }

  load() {
    this.loanService
      .listFromUserPaginated(this.id, ++this.currentPage)
      .subscribe(loans => {
        this.filter = '';
        this.loans = this.loans.concat(loans);
        if(!loans.length) this.hasMore = false;
      });
  }
}
