import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public showPassword: boolean = false;
  lblid: any;
  lblname: any;
  lblemail: any;
  lblpassword: any;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<ProfileComponent>
  ) {}

  editdata: Users;

  ngOnInit(): void {
    this.service
      .getBycode(localStorage.getItem('username'))
      .subscribe((res: Users) => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,
          fullname: this.editdata.fullname,
          email: this.editdata.email,
          phone: this.editdata.phone,
          password: this.editdata.password,
          role: this.editdata.role,
          isactive: this.editdata.isactive,
        });
      });
  }

  registerform = this.builder.group({
    id: this.builder.control(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    fullname: this.builder.control('', Validators.required),
    email: this.builder.control(''),
    phone: this.builder.control('', Validators.required),
    password: this.builder.control(''),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
  });

  updateuser() {
    if (this.registerform.valid) {
      let choice = confirm('Are you sure you want to update?');
      if (choice) {
        this.service
          .updateUser(this.registerform.value.id, this.registerform.value)
          .subscribe(
            (res) => {
              this.toastr.success('Updated succesfully.');
            },
            (error: Response) => {
              if (error.status === 404) {
                this.toastr.warning("You're Not Allowed To Edit Username");
                setTimeout(function () {
                  window.location.reload();
                }, 3000);
              } else {
                // We wanna display generic error message and log the error
                this.toastr.error('Service Down!, Try Again Later.');
                console.log(error);
              }
            }
          );
      } else {
        this.toastr.warning('User Not Updated');
      }
    } else {
      this.toastr.warning('Please Select Role');
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  session() {
    return localStorage.getItem('username');
  }
}
