import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { NgxSpinnerModule } from 'ngx-spinner';

import { IonicModule } from '@ionic/angular';

import { RegisterUserPage } from './register-user.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterUserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  declarations: [RegisterUserPage]
})
export class RegisterUserPageModule {}
