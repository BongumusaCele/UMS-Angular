import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { ActivatepopupComponent } from '../activatepopup/activatepopup.component';
import { EdituserComponent } from '../edituser/edituser.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent {
  constructor(
    private service: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.LoadCustomer();
    this.SetAccesspermission();
  }

  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  accessdata: any;
  haveedit = false;
  haveadd = false;
  havedelete = false;

  LoadCustomer() {
    this.service.getAll().subscribe((res) => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  SetAccesspermission() {
    this.service
      .Getaccessbyrole(this.service.GetUserrole(), 'customer')
      .subscribe((res) => {
        this.accessdata = res;
        console.log(this.accessdata);

        if (this.accessdata.length > 0) {
          this.haveadd = this.accessdata[0].haveadd;
          this.haveedit = this.accessdata[0].haveedit;
          this.havedelete = this.accessdata[0].havedelete;
        }
      });
  }

  displayedColumns: string[] = [
    'username',
    'name',
    'password',
    'email',
    'role',
    'status',
    'action',
  ];

  Activation(code: any) {
    const activationpopup = this.dialog.open(ActivatepopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code,
      },
    });

    activationpopup.afterClosed().subscribe((res) => {
      this.LoadCustomer();
    });
  }

  UpdateCustomer(code: any) {
    if (this.haveedit) {
      const edituserpopup = this.dialog.open(EdituserComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '50%',
        data: {
          usercode: code,
        },
      });

      edituserpopup.afterClosed().subscribe((res) => {
        this.LoadCustomer();
      });
      this.toastr.success('Success');
    } else {
      this.toastr.warning("You don't have access to Edit");
    }
  }

  RemoveCustomer(code: any) {
    if (this.havedelete) {
      this.service.deleteUser(code).subscribe();
      this.toastr.success('Success');
    } else {
      this.toastr.warning("You don't have access to Edit");
    }
  }

  AddCustomer(code: any) {
    if (this.havedelete) {
      this.toastr.success('Success');
    } else {
      this.toastr.warning("You don't have access to Edit");
    }
  }

  opendialog() {}
}
