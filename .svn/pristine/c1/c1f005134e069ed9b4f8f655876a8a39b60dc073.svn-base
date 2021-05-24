import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';

import { CreatePasswordPage } from './create-password.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePasswordPage
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
  declarations: [CreatePasswordPage]
})
export class CreatePasswordPageModule {}
