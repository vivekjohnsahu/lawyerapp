import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ManageEnquiryPage } from './manage-enquiry.page';
var routes = [
    {
        path: '',
        component: ManageEnquiryPage
    }
];
var ManageEnquiryPageModule = /** @class */ (function () {
    function ManageEnquiryPageModule() {
    }
    ManageEnquiryPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule
            ],
            declarations: [ManageEnquiryPage]
        })
    ], ManageEnquiryPageModule);
    return ManageEnquiryPageModule;
}());
export { ManageEnquiryPageModule };
//# sourceMappingURL=manage-enquiry.module.js.map