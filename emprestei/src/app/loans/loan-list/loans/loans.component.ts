import { Component, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { Loan } from '../../loan/loan';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnChanges {
  
  @Input() loans: Loan[] = [];
  rows: any[] = [];

  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.loans)
      this.rows = this.groupColumns(this.loans);
  }
  
  groupColumns(loans: Loan[]) {
    const newRows = [];

    for(let index = 0; index < loans.length; index+=3) {
      newRows.push(loans.slice(index, index + 3));
    }
    return newRows;
  }
}
