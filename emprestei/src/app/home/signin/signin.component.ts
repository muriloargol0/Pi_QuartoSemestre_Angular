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

  doLogin(){
    alert(this.loginForm.get('userName').value);
    alert(this.loginForm.get('password').value);    
  }

}
