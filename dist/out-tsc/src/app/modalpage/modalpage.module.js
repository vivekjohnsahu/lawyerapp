import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalpagePage } from './modalpage.page';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: ModalpagePage
    }
];
var ModalpagePageModule = /** @class */ (function () {
    function ModalpagePageModule() {
    }
    ModalpagePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                NgxSpinnerModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule
            ],
            declarations: [ModalpagePage]
        })
    ], ModalpagePageModule);
    return ModalpagePageModule;
}());
export { ModalpagePageModule };
//# sourceMappingURL=modalpage.module.js.map