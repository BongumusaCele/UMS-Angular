import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.css'],
})
export class UpdatepopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdatepopupComponent>
  ) {}

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
          role: this.editdata.role,
          gender: this.editdata.gender,
          isactive: this.editdata.isactive,
        });
      });
    }
  }

  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
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
