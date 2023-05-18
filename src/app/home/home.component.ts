import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepopupComponent } from '../updatepopup/updatepopup.component';
import { EdituserComponent } from '../edituser/edituser.component';
import { UpdateuserpopupComponent } from '../updateuserpopup/updateuserpopup.component';
import { Router } from '@angular/router';
import { Users } from '../users';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private service: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.Loaduser();
  }

  ngOnInit() {}

  userlist: any;
  //dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Loaduser() {
    this.service.getAll().subscribe((res) => {
      this.userlist = res;
      // this.dataSource = new MatTableDataSource(this.userlist);
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    });
  }

  displayedColumns: string[] = ['username', 'name', 'email', 'action'];

  UpdateUser(code: string) {
    const popup = this.dialog.open(UpdateuserpopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        usercode: code,
      },
    });

    popup.afterClosed().subscribe((res) => {
      this.Loaduser();
    });
  }
  session() {
    return localStorage.getItem('username');
  }

  checkRole() {
    if (localStorage.getItem('username')) {
      return true;
    } else {
      return false;
    }
  }

  opendialog() {}
}
