import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CreatePasswordPage } from './create-password.page';
var routes = [
    {
        path: '',
        component: CreatePasswordPage
    }
];
var CreatePasswordPageModule = /** @class */ (function () {
    function CreatePasswordPageModule() {
    }
    CreatePasswordPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                NgxSpinnerModule
            ],
            declarations: [CreatePasswordPage]
        })
    ], CreatePasswordPageModule);
    return CreatePasswordPageModule;
}());
export { CreatePasswordPageModule };
//# sourceMappingURL=create-password.module.js.map