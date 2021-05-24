import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonicModule } from '@ionic/angular';
import { RegisterUserPage } from './register-user.page';
var routes = [
    {
        path: '',
        component: RegisterUserPage
    }
];
var RegisterUserPageModule = /** @class */ (function () {
    function RegisterUserPageModule() {
    }
    RegisterUserPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                NgxSpinnerModule
            ],
            declarations: [RegisterUserPage]
        })
    ], RegisterUserPageModule);
    return RegisterUserPageModule;
}());
export { RegisterUserPageModule };
//# sourceMappingURL=register-user.module.js.map