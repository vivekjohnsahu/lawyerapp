import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { IonicModule } from '@ionic/angular';

import { ManageLawyerPage } from './manage-lawyer.page';
import { GrdFilterPipe } from '../../../src/search-filter/searchFilter';
import { NgxSpinnerModule } from 'ngx-spinner';

const routes: Routes = [
  {
    path: '',
    component: ManageLawyerPage
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
  // exports:[GrdFilterPipe],
  declarations: [ManageLawyerPage,
    GrdFilterPipe
  ]
})
export class ManageLawyerPageModule {}
