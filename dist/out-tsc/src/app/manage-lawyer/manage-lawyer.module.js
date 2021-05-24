import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ManageLawyerPage } from './manage-lawyer.page';
import { GrdFilterPipe } from '../../../src/search-filter/searchFilter';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: ManageLawyerPage
    }
];
var ManageLawyerPageModule = /** @class */ (function () {
    function ManageLawyerPageModule() {
    }
    ManageLawyerPageModule = tslib_1.__decorate([
        NgModule({
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
    ], ManageLawyerPageModule);
    return ManageLawyerPageModule;
}());
export { ManageLawyerPageModule };
//# sourceMappingURL=manage-lawyer.module.js.map