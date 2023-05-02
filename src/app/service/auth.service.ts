import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiurl = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.apiurl);
  }

  getBycode(code: any) {
    return this.http.get(this.apiurl + '/' + code);
  }

  getAllRole() {
    return this.http.get('http://localhost:3000/role');
  }

  proceedRegister(inputData: any) {
    return this.http.post(this.apiurl, inputData);
  }

  updateUser(code: any, inputData: any) {
    return this.http.put(this.apiurl + '/' + code, inputData);
  }

  IsloggedIn() {
    return sessionStorage.getItem('username') != null;
  }

  GetUserrole() {
    return sessionStorage.getItem('usserrole') != null
      ? sessionStorage.getItem('userrole')?.toString()
      : '';
  }
}
