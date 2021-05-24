import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LawyerDetailPage } from './lawyer-detail.page';
var routes = [
    {
        path: '',
        component: LawyerDetailPage
    }
];
var LawyerDetailPageModule = /** @class */ (function () {
    function LawyerDetailPageModule() {
    }
    LawyerDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule
            ],
            declarations: [LawyerDetailPage]
        })
    ], LawyerDetailPageModule);
    return LawyerDetailPageModule;
}());
export { LawyerDetailPageModule };
//# sourceMappingURL=lawyer-detail.module.js.map