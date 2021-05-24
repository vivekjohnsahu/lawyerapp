import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PaymentErrorPage } from './payment-error.page';
var routes = [
    {
        path: '',
        component: PaymentErrorPage
    }
];
var PaymentErrorPageModule = /** @class */ (function () {
    function PaymentErrorPageModule() {
    }
    PaymentErrorPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PaymentErrorPage]
        })
    ], PaymentErrorPageModule);
    return PaymentErrorPageModule;
}());
export { PaymentErrorPageModule };
//# sourceMappingURL=payment-error.module.js.map