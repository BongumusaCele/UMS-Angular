import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiurl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Users[]>(this.apiurl + '/get-users');
  }

  getBycode(code: string) {
    return this.http.get(this.apiurl + '/get-users/' + code);
  }

  getAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  proceedRegister(inputData: any) {
    return this.http.post(this.apiurl + '/register-user', inputData);
  }

  updateUser(code: string, inputData: any) {
    return this.http.put(this.apiurl + '/update-user/' + code, inputData);
  }

  IsloggedIn() {
    return localStorage.getItem('username') != null;
  }

  GetUserrole() {
    if (localStorage.getItem('userrole') === null) {
      return '';
    } else {
      return localStorage.getItem('userrole');
    }
    /*return sessionStorage.getItem('usserrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';*/
  }

  deleteUser(code: string) {
    return this.http.delete(this.apiurl + '/delete-user/' + code);
  }
}
