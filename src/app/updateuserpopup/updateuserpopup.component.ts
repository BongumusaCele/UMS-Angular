import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updateuserpopup',
  templateUrl: './updateuserpopup.component.html',
  styleUrls: ['./updateuserpopup.component.css']
})
export class UpdateuserpopupComponent {
  public showPassword: boolean = false;
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateuserpopupComponent>
  ) { }

  rolelist: any;
  editdata: any;

  ngOnInit(): void {
    this.service.getAllRole().subscribe((res) => {
      this.rolelist = res;
    });

    if (this.data.usercode != null && this.data.usercode != '') {
      this.service.getBycode(this.data.usercode).subscribe((res) => {
        this.editdata = res;
        this.registerform.setValue({
          id: this.editdata.id,
          name: this.editdata.name,
          email: this.editdata.email,
          password: this.editdata.password,
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
    name: this.builder.control('', Validators.required),
    password: this.builder.control(''),
    email: this.builder.control(''),
    isactive: this.builder.control(false),
  });

  updateuser() {
    if (this.registerform.valid) {
      this.service
        .updateUser(this.registerform.value.id, this.registerform.value)
        .subscribe((res) => {
          this.toastr.success('Updated succesfully.');
          this.dialog.close();
        });
    } else {
      this.toastr.warning('Please Select Role');
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
