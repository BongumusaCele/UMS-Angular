import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { Users } from '../users';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  public showPassword: boolean = false;
  userdata: Users;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (this.service.IsloggedIn()) {
      this.router.navigate(['']);
    }
  }

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
  });

  proceedLogin() {
    if (this.loginform.valid) {
      this.service.getBycode(this.loginform.value.username).subscribe(
        (res: Users) => {
          this.userdata = res;
          console.log(this.userdata);
          if (this.userdata.password === this.loginform.value.password) {
            if (this.userdata.isactive) {
              const date = new Date().setMinutes(new Date().getSeconds() + 60);

              localStorage.setItem(
                'sessionExp',
                JSON.stringify({
                  value: 'string',
                  expDate: date,
                })
              );

              localStorage.setItem('username', this.userdata.id);
              localStorage.setItem('userrole', this.userdata.role);
              this.router.navigate(['']);
            } else {
              this.toastr.error('Please contact admin', 'In Active User');
            }
          } else {
            this.toastr.error('Invalid Password');
          }
        },
        (error: Response) => {
          if (error.status === 404) this.toastr.warning('Username Not Found');
          else {
            // We wanna display generic error message and log the error
            this.toastr.error('Service Down!, Try Again Later');
          }
        }
      );
    } else {
      this.toastr.warning('Please enter valid data');
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
