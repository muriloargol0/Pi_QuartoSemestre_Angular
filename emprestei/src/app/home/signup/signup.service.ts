import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { NewUser } from './new-user';

const API_URL = "http://localhost:8000";

@Injectable({ providedIn: 'root'})
export class SignUpService {
    
    constructor(private http: HttpClient) { }

    checkUserNameTaken(userName: string) {

        return this.http.get<NewUser[]>(API_URL + '/account/').pipe(map(response => response.find(account => account.acc_username == userName)));
    }

    signUp(newUser: NewUser) {
        return this.http.post<NewUser>(API_URL + '/account/', newUser);
    }

    loadUser() {
        return this.http.get<NewUser>(`${API_URL}/account/1`);
    }
}
