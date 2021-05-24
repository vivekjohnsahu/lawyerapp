import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonicModule } from '@ionic/angular';

import { UserEditPage } from './user-edit.page';

const routes: Routes = [
  {
    path: '',
    component: UserEditPage
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
  declarations: [UserEditPage]
})
export class UserEditPageModule {}
