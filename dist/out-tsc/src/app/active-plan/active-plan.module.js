import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ActivePlanPage } from './active-plan.page';
var routes = [
    {
        path: '',
        component: ActivePlanPage
    }
];
var ActivePlanPageModule = /** @class */ (function () {
    function ActivePlanPageModule() {
    }
    ActivePlanPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                NgxSpinnerModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ActivePlanPage]
        })
    ], ActivePlanPageModule);
    return ActivePlanPageModule;
}());
export { ActivePlanPageModule };
//# sourceMappingURL=active-plan.module.js.map