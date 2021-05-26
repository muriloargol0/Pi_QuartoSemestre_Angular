import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dateValidator } from 'src/app/shared/validators/date.validator';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signUpService: SignUpService,
    private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      acc_email: ['', 
        [
          Validators.required,
          Validators.email
        ]
      ],
      acc_name: ['', 
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      acc_username: ['', 
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      acc_password: ['', 
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ],
      acc_dt_birthday: ['', 
        [
          Validators.required,
          dateValidator,
        ]
      ]
    });
  }

  loadUser() {
    this.signUpService.loadUser().subscribe(res => {
      this.signUpForm.get('acc_email').patchValue(res.acc_email);
      this.signUpForm.get('acc_name').patchValue(res.acc_name);
      this.signUpForm.get('acc_username').patchValue(res.acc_username);
      this.signUpForm.get('acc_password').patchValue(res.acc_password);
      this.signUpForm.get('acc_dt_birthday').patchValue(res.acc_dt_birthday);
    }, err => console.log(err));
  }

  signup() {
    const newUser = this.signUpForm.getRawValue() as NewUser;
    newUser.stts_id = 1;
    newUser.acc_password_was_reset = false;
    newUser.acc_dt_birthday = this.formataStringData(newUser.acc_dt_birthday);
    console.table(newUser)
    this.signUpService
      .signup(newUser)
      .subscribe(
        res => {
          console.log(res); 
          this.router.navigate(['']);
         },
        err => console.log(err)
      );
  }

  formataStringData(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
    // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
  }

}
