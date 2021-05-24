import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OtpPage } from './otp.page';
var routes = [
    {
        path: '',
        component: OtpPage
    }
];
var OtpPageModule = /** @class */ (function () {
    function OtpPageModule() {
    }
    OtpPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                NgxSpinnerModule
            ],
            declarations: [OtpPage]
        })
    ], OtpPageModule);
    return OtpPageModule;
}());
export { OtpPageModule };
//# sourceMappingURL=otp.module.js.map