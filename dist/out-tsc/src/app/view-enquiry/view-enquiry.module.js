import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ViewEnquiryPage } from './view-enquiry.page';
var routes = [
    {
        path: '',
        component: ViewEnquiryPage
    }
];
var ViewEnquiryPageModule = /** @class */ (function () {
    function ViewEnquiryPageModule() {
    }
    ViewEnquiryPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule
            ],
            declarations: [ViewEnquiryPage]
        })
    ], ViewEnquiryPageModule);
    return ViewEnquiryPageModule;
}());
export { ViewEnquiryPageModule };
//# sourceMappingURL=view-enquiry.module.js.map