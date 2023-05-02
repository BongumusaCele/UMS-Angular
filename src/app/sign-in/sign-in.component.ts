import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  userdata: any;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {
    sessionStorage.clear();
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginform.valid) {
      this.service.getBycode(this.loginform.value.username).subscribe((res) => {
        this.userdata = res;
        console.log(this.userdata);
        if (this.userdata.password === this.loginform.value.password) {
          if (this.userdata.isactive) {
            sessionStorage.setItem('username', this.userdata.id);
            sessionStorage.setItem('userrole', this.userdata.role);
            this.router.navigate(['']);
          } else {
            this.toastr.error('Please contact admin', 'In Active User');
          }
        } else {
          this.toastr.error('Invalid Credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }
}
