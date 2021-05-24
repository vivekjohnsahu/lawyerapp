import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PayNowPage } from './pay-now.page';
var routes = [
    {
        path: '',
        component: PayNowPage
    }
];
var PayNowPageModule = /** @class */ (function () {
    function PayNowPageModule() {
    }
    PayNowPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                NgxSpinnerModule,
                RouterModule.forChild(routes)
            ],
            declarations: [PayNowPage],
            providers: []
        })
    ], PayNowPageModule);
    return PayNowPageModule;
}());
export { PayNowPageModule };
//# sourceMappingURL=pay-now.module.js.map