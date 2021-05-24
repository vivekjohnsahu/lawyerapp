import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';

import { VerifyOtpPage } from './verify-otp.page';
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  {
    path: '',
    component: VerifyOtpPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule
  ],
  declarations: [VerifyOtpPage]
})
export class VerifyOtpPageModule {}
