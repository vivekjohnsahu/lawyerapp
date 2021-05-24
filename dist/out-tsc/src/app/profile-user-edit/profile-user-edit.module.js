import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProfileUserEditPage } from './profile-user-edit.page';
var routes = [
    {
        path: '',
        component: ProfileUserEditPage
    }
];
var ProfileUserEditPageModule = /** @class */ (function () {
    function ProfileUserEditPageModule() {
    }
    ProfileUserEditPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule
            ],
            declarations: [ProfileUserEditPage]
        })
    ], ProfileUserEditPageModule);
    return ProfileUserEditPageModule;
}());
export { ProfileUserEditPageModule };
//# sourceMappingURL=profile-user-edit.module.js.map