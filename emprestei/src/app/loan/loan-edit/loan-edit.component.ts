import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Loan } from '../loan';
import { LoanService } from '../loan.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.css']
})
export class LoanEditComponent implements OnInit {
  
  loanForm: FormGroup;
  @ViewChild('loanInput') loanInput: ElementRef<HTMLInputElement>;

  private idUser: number;
  private idLoan: number;
  private loan: Loan;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private loanService: LoanService) { 
    this.route.params.subscribe(params => this.idLoan = params['loan']);
  }

  ngOnInit(): void {
    console.log(this.idLoan);
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
    
    this.loadEditLoan(this.idLoan);
    
    
  }

  loadEditLoan(idLoan: number) {
    this.loanService.loadLoan(idLoan).subscribe(res => {
      res.forEach(item => {
        this.loanForm.get('loan_description').patchValue(item.loan_description);
        this.loanForm.get('loan_to_name').patchValue(item.loan_to_name);
        this.loanForm.get('loan_date').patchValue(this.formatStringDataToDisplay(item.loan_date));
        this.loanForm.get('loan_return_date').patchValue(this.formatStringDataToDisplay(item.loan_return_date));
        this.loanForm.get('loan_observation').patchValue(item.loan_observation);
        this.loanForm.get('loan_estimated_value').patchValue(item.loan_estimated_value);
      })

      console.log(this.loanForm.get('loan_description').value);
    }, err => console.log(err));
  }

  formatStringDataToDisplay(data) {
    var ano  = data.split("-")[0];
    var mes  = data.split("-")[1];
    var dia  = data.split("-")[2];
  
    return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

}
