import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatepopupComponent } from '../activatepopup/activatepopup.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { Users } from '../users';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.css'],
})
export class UserlistingComponent {
  constructor(
    private service: AuthService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.LoadCustomer();
  }

  customerlist: any;
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  LoadCustomer() {
    this.service.getAll().subscribe((res) => {
      this.customerlist = res;
      this.dataSource = new MatTableDataSource(this.customerlist);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = [
    'username',
    'fullname',
    'email',
    'phone',
    'password',
    'role',
    'status',
    'action',
  ];

  Activation(code: string) {
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

  UpdateCustomer(code: string) {
    if (localStorage.getItem('userrole') === 'admin') {
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
    } else {
      this.toastr.warning("You don't have access to Edit");
    }
  }

  RemoveCustomer(code: string) {
    if (localStorage.getItem('userrole') === 'admin') {
      let choice = confirm('Are you sure you want to delete?');
      if (choice) {
        this.service.deleteUser(code).subscribe();
        this.LoadCustomer();
        this.toastr.success('Success');
      } else {
        this.toastr.warning('User Not Deleted');
      }
    } else {
      this.toastr.warning("You don't have access to Delete");
    }
  }

  AddCustomer(code: string) {
    if (localStorage.getItem('userrole') === 'admin') {
      this.toastr.success('Success');
    } else {
      this.toastr.warning("You don't have access to Add");
    }
  }

  session() {
    return localStorage.getItem('username');
  }

  opendialog() {}
}
