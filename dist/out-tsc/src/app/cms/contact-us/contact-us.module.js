import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactUsPage } from './contact-us.page';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: ContactUsPage
    }
];
var ContactUsPageModule = /** @class */ (function () {
    function ContactUsPageModule() {
    }
    ContactUsPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes),
                ReactiveFormsModule,
                NgxSpinnerModule
            ],
            declarations: [ContactUsPage]
        })
    ], ContactUsPageModule);
    return ContactUsPageModule;
}());
export { ContactUsPageModule };
//# sourceMappingURL=contact-us.module.js.map