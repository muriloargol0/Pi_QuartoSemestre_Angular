import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoanService } from '../../loan.service';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent implements OnInit {

  private idUser: number;

  constructor(private route: ActivatedRoute, private loanService: LoanService) {
    this.route.params.subscribe(params => this.idUser = params['user']) 
  }
  
  ngOnInit(): void {
  }

  editLoan() {
    
  }

}
