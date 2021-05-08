import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  private _loginError: boolean = false;

  
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  hasError(errorCode: string, formControlName: string){
    return (this.loginForm.get(formControlName).hasError(errorCode) && this.loginForm.get(formControlName).touched)
  }

  public set loginError(value: boolean){
    this._loginError = value;
  }

  public get loginError(): boolean{
    return this._loginError;
  }

  doLogin(){   
    this.loginError = false;

    if(this.loginForm.get('userName').value != 'adm' || this.loginForm.get('password').value != '123'){
      console.log('login errado');
      this.loginError = true;
    }

    console.log(this.loginError);
  }

}
