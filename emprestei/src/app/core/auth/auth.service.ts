import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Account } from 'src/app/home/signin/account';


const API_URL = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private userService: UserService) { }

    authenticate(userName: string, password: string): Observable<Account> {
      
      return this.http
        .get<Account[]>(API_URL + '/account/')
        .pipe(map(users => users.find(u => u.acc_username === userName && 
          u.acc_password === password)));
    }
}
