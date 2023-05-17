import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Users } from '../users';

@Component({
  selector: 'app-activatepopup',
  templateUrl: './activatepopup.component.html',
  styleUrls: ['./activatepopup.component.css'],
})
export class ActivatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<ActivatepopupComponent>
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
    id: this.builder.control(''),
    fullname: this.builder.control(''),
    email: this.builder.control(''),
    phone: this.builder.control(''),
    password: this.builder.control(''),
    role: this.builder.control(''),
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
}
