import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditProfileFirmPage } from './edit-profile-firm.page';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: EditProfileFirmPage
    }
];
var EditProfileFirmPageModule = /** @class */ (function () {
    function EditProfileFirmPageModule() {
    }
    EditProfileFirmPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule,
                ReactiveFormsModule
            ],
            declarations: [EditProfileFirmPage]
        })
    ], EditProfileFirmPageModule);
    return EditProfileFirmPageModule;
}());
export { EditProfileFirmPageModule };
//# sourceMappingURL=edit-profile-firm.module.js.map