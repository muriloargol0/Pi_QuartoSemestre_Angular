import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from '../user/user.service';
import { tap } from 'rxjs/operators'


const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private userService: UserService) { }

    authenticate(userName: string, password: string) {

      return this.http
        .post(API_URL + '/user/login',
          {userName, password},
          {observe: 'response'})
        .pipe(tap(res => {
          console.log(res);
          const authToken = res.headers.get('x-access-token');
          this.userService.setToken(authToken);
          console.log(`User ${userName} authenticated with token ${authToken}`);
        }))
    }
}