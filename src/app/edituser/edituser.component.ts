import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../users';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent {
  public showPassword: boolean = false;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<EdituserComponent>
  ) {}

  editdata: Users;

  ngOnInit(): void {
    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getBycode(this.data.usercode).subscribe((res: Users) => {
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
  }

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
    role: this.builder.control(''),
    isactive: this.builder.control(false),
  });

  updateuser() {
    if (this.registerform.valid) {
      this.service
        .updateUser(this.registerform.value.id, this.registerform.value)
        .subscribe(
          (res) => {
            this.toastr.success('Updated succesfully.');
            this.dialog.close();
          },
          (error: Response) => {
            if (error.status === 200) {
              this.toastr.success('Updated succesfully.');
              this.dialog.close();
            } else if (error.status === 500) {
              this.toastr.warning("You're Not Allowed To Edit Username");
            } else {
              // We wanna display generic error message and log the error
              this.toastr.error('Service Down!, Try Again Later.');
              console.log(error);
            }
          }
        );
    } else {
      this.toastr.warning('Please Enter Valid Fields');
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
