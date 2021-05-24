import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonicModule } from '@ionic/angular';
import { ForgotpasswordPage } from './forgotpassword.page';
var routes = [
    {
        path: '',
        component: ForgotpasswordPage
    }
];
var ForgotpasswordPageModule = /** @class */ (function () {
    function ForgotpasswordPageModule() {
    }
    ForgotpasswordPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                NgxSpinnerModule
            ],
            declarations: [ForgotpasswordPage]
        })
    ], ForgotpasswordPageModule);
    return ForgotpasswordPageModule;
}());
export { ForgotpasswordPageModule };
//# sourceMappingURL=forgotpassword.module.js.map