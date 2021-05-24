import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserMyProfilePage } from './user-my-profile.page';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: UserMyProfilePage
    }
];
var UserMyProfilePageModule = /** @class */ (function () {
    function UserMyProfilePageModule() {
    }
    UserMyProfilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule
            ],
            declarations: [UserMyProfilePage]
        })
    ], UserMyProfilePageModule);
    return UserMyProfilePageModule;
}());
export { UserMyProfilePageModule };
//# sourceMappingURL=user-my-profile.module.js.map