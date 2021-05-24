import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VerifyOtpPage } from './verify-otp.page';
import { ReactiveFormsModule } from '@angular/forms';
var routes = [
    {
        path: '',
        component: VerifyOtpPage
    }
];
var VerifyOtpPageModule = /** @class */ (function () {
    function VerifyOtpPageModule() {
    }
    VerifyOtpPageModule = tslib_1.__decorate([
        NgModule({
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
    ], VerifyOtpPageModule);
    return VerifyOtpPageModule;
}());
export { VerifyOtpPageModule };
//# sourceMappingURL=verify-otp.module.js.map