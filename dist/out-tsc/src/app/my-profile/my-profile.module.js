import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MyProfilePage } from './my-profile.page';
var routes = [
    {
        path: '',
        component: MyProfilePage
    }
];
var MyProfilePageModule = /** @class */ (function () {
    function MyProfilePageModule() {
    }
    MyProfilePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule
            ],
            declarations: [MyProfilePage]
        })
    ], MyProfilePageModule);
    return MyProfilePageModule;
}());
export { MyProfilePageModule };
//# sourceMappingURL=my-profile.module.js.map