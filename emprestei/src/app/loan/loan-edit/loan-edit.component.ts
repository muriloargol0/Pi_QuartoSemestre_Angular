import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private idUserRoute: number;
  private idUserRouteString: string;
  public idLoan: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router,
    private loanService: LoanService) { 
    this.route.params.subscribe(params => this.idLoan = params['loan']);
    this.route.params.subscribe(params => this.idUserRouteString = params['user']);
    
    if(this.idUserRouteString != null){
      this.idUserRoute = Number(this.idUserRouteString.split('user=').pop());
    }
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
    
    if(this.idLoan != null){
      this.loadEditLoan(this.idLoan);
    }   
  }

  loadEditLoan(idLoan: number) {
    this.loanService.loadLoan(idLoan).subscribe(res => {
      res.forEach(item => {
        this.loanForm.get('loan_description').patchValue(item.loan_description);
        this.loanForm.get('loan_to_name').patchValue(item.loan_to_name);
        this.loanForm.get('loan_date').patchValue(item.loan_date);
        this.loanForm.get('loan_return_date').patchValue(this.formatStringDataToDisplay(item.loan_return_date));
        this.loanForm.get('loan_observation').patchValue(item.loan_observation);
        this.loanForm.get('loan_estimated_value').patchValue(item.loan_estimated_value);
        this.idUser = item.acc_id;
      })
    }, err => console.log(err));
  }

  returnList() {
    console.log(this.idUserRoute)
    this.router.navigate([`../../user=${this.idUser == 0 || this.idUser == null ? this.idUserRoute : this.idUser}`], {relativeTo: this.route});
  }

  saveLoan(){
    var date = new Date();
    let loan: Loan = new Loan();

    loan.acc_id = this.idUserRoute;
    loan.loan_date = this.loanForm.get('loan_date').value;
    loan.loan_description = this.loanForm.get('loan_description').value;
    loan.loan_estimated_value = this.loanForm.get('loan_estimated_value').value;
    loan.loan_observation = this.loanForm.get('loan_observation').value;
    loan.loan_to_name = this.loanForm.get('loan_to_name').value;

    if(this.idLoan == 0 || this.idLoan == null){
      this.loanService.saveLoan(loan).subscribe(res => {
        alert("Empr??stimo cadastrado com sucesso!");
      }, err => {
        alert("Erro ao salvar novo empr??stimo! " + err);
      });
    } else {
      loan.id = this.idLoan;
      loan.acc_id = this.idUser;
      if(this.loanForm.get('loan_return_date').value != '')
        loan.loan_return_date = this.formatStringDataToSave(this.loanForm.get('loan_return_date').value);
        
      console.table(loan);

      this.loanService.updateLoan(loan).subscribe(res => {
        alert("Empr??stimo atualizado com sucesso!");
      }, err => { alert("Erro ao atualizar o registro!");})
    }
  }

  formatStringDataToDisplay(data) {
    var ano  = "";
    var mes  = "";
    var dia  = "";
    if(data != null && data != ""){
      ano = data.split("-")[0];
      mes = data.split("-")[1];
      dia = data.split("-")[2];

      return ("0"+dia).slice(-2) + '/' + ("0"+mes).slice(-2) + '/' + ano;
    }
    return null;
  }

  formatStringDataToSave(data: string) {
    var ano  = "";
    var mes  = "";
    var dia  = "";
    if(data != null && data != ""){
      ano = data.split("/")[2];
      mes = data.split("/")[1];
      dia = data.split("/")[0];

      return ano + '-' + mes + '-' + dia;
    }
    return null;
  }

  clearForm(){
    this.idLoan = 0;
    this.loanForm.reset();
  }
}
