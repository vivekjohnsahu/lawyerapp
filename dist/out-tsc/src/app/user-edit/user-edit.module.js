import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IonicModule } from '@ionic/angular';
import { UserEditPage } from './user-edit.page';
var routes = [
    {
        path: '',
        component: UserEditPage
    }
];
var UserEditPageModule = /** @class */ (function () {
    function UserEditPageModule() {
    }
    UserEditPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                NgxSpinnerModule
            ],
            declarations: [UserEditPage]
        })
    ], UserEditPageModule);
    return UserEditPageModule;
}());
export { UserEditPageModule };
//# sourceMappingURL=user-edit.module.js.map