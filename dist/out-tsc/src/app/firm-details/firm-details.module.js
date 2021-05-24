import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FirmDetailsPage } from './firm-details.page';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: FirmDetailsPage
    }
];
var FirmDetailsPageModule = /** @class */ (function () {
    function FirmDetailsPageModule() {
    }
    FirmDetailsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                NgxSpinnerModule,
                RouterModule.forChild(routes)
            ],
            declarations: [FirmDetailsPage]
        })
    ], FirmDetailsPageModule);
    return FirmDetailsPageModule;
}());
export { FirmDetailsPageModule };
//# sourceMappingURL=firm-details.module.js.map