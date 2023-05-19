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
    phone: this.builder.control(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ])
    ),
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
    if (this.registerform.value.id.length < 5) {
      this.toastr.warning('Username Length must be minimum 5 characters');
    } else if (this.registerform.value.fullname === '') {
      this.toastr.warning('Fullname is required');
    } else if (
      this.registerform.value.email === '' ||
      this.ValidateEmail(this.registerform.value.email) === false
    ) {
      this.toastr.warning('Please enter valid email');
    } else if (
      this.registerform.value.phone === '' &&
      this.registerform.value.phone.length < 10 &&
      this.registerform.value.phone.length > 10
    ) {
      this.toastr.warning('Phone is required, 10 characters');
    } else if (this.checkPassword(this.registerform.value.password) === false) {
      this.toastr.warning(
        'Password must be minimum 9 Character, 1 Capital Letter, 1 Number and a special characters'
      );
    } else if (this.registerform.invalid) {
      console.log(this.registerform.status);
      this.toastr.warning('Please enter valid data');
    } else {
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
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  checkPassword(str: any) {
    var pe =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}/;
    return pe.test(str);
  }

  ValidateEmail(mail) {
    var em = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return em.test(mail);
  }
}
