import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Loan } from '../loan';
import { LoanService } from '../loan.service';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.css']
})
export class LoanEditComponent implements OnInit {
  
  loanForm: FormGroup;
  @ViewChild('loanInput') testeInput: ElementRef<HTMLInputElement>;

  private idUser: number;
  private idLoan: number;
  private loan: Loan[];


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private loanService: LoanService) { 
    this.route.params.subscribe(params => this.idUser = params['user']);
  }

  ngOnInit(): void {
    this.loanForm = this.formBuilder.group({
      loan_description: ['', 
        [
          Validators.required
        ]
      ],
      loan_to_name: ['', 
        [
          Validators.required
        ]
      ],
      loan_date: ['', 
        [
          Validators.required
        ]
      ],
      loan_return_date: ['', 
        [
          Validators.required
        ]
      ],
      loan_observation: ['', 
        [
          Validators.required
        ]
      ],
      loan_estimated_value: ['', 
        [
          Validators.required
        ]
      ],
    })

    this.loanService.loadLoan(this.idUser, this.idLoan).subscribe(res => {
      this.loan = res
    }, err => {
      alert('Erro ao carregar o empréstimo!');
    });

  }

}
