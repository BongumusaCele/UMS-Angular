import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControlDirective,
  FormGroupDirective,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { UserlistingComponent } from './userlisting/userlisting.component';
import { UpdatepopupComponent } from './updatepopup/updatepopup.component';
import { MatIconModule } from '@angular/material/icon';
import { CustomerComponent } from './customer/customer.component';
import { ActivatepopupComponent } from './activatepopup/activatepopup.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UpdateuserpopupComponent } from './updateuserpopup/updateuserpopup.component';
import { ProfileComponent } from './profile/profile.component';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    UserlistingComponent,
    UpdatepopupComponent,
    CustomerComponent,
    ActivatepopupComponent,
    EdituserComponent,
    UpdateuserpopupComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatIconModule,
    MatMenuModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    { provide: FormControlDirective, useValue: {} },
    { provide: FormGroupDirective, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
