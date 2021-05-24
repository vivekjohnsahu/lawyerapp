import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RegisterSelectPage } from './register-select.page';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: RegisterSelectPage
    }
];
var RegisterSelectPageModule = /** @class */ (function () {
    function RegisterSelectPageModule() {
    }
    RegisterSelectPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule
            ],
            declarations: [RegisterSelectPage]
        })
    ], RegisterSelectPageModule);
    return RegisterSelectPageModule;
}());
export { RegisterSelectPageModule };
//# sourceMappingURL=register-select.module.js.map