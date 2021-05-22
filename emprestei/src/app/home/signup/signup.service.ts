import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from './new-user';

const API_URL = "http://localhost:8000"
const API_ALURA = "http://localhost:3000"

@Injectable({ providedIn: 'root'})
export class SignUpService {
    
    constructor(private http: HttpClient) { }

    checkUserNameTaken(userName: string) {

        return this.http.get(API_ALURA + '/user/exists/' + userName);
    }

    signup(newUser: NewUser) {
        // var opts = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Access-Control-Allow-Origin':'*'
        // });
        // console.log('opts:')
        // console.log(opts);
        return this.http.post<NewUser>(API_URL + '/account/', newUser);
    }

    loadUser() {
        return this.http.get<NewUser>(`${API_URL}/account/6`);
    }
}
