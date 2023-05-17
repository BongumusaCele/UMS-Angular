import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public showPassword: boolean = false;

  constructor(
    private builder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthService,
    private router: Router
  ) {}

  registerform = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    fullname: this.builder.control('', Validators.required),
    email: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phone: this.builder.control('', Validators.required),
    password: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
      ])
    ),
    role: this.builder.control('user'),
    isactive: this.builder.control(false),
  });

  proceedRegistration() {
    if (this.registerform.valid) {
      this.service.proceedRegister(this.registerform.value).subscribe(
        (res) => {
          this.toastr.success(
            'Contact Admin For Access',
            'Sign Up Successful!'
          );
          this.router.navigate(['sign-in']);
        },
        (error: Response) => {
          if (error.status === 500)
            this.toastr.warning('username already exists');
          else {
            // We wanna display generic error message and log the error
            this.toastr.error('Service Down!, Try Again Later.');
            console.log(error);
          }
        }
      );
    } else {
      console.log(this.registerform.status);
      this.toastr.warning('Please enter valid data');
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
