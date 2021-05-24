import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DemoPage } from './demo.page';
var routes = [
    {
        path: '',
        component: DemoPage
    }
];
var DemoPageModule = /** @class */ (function () {
    function DemoPageModule() {
    }
    DemoPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [DemoPage]
        })
    ], DemoPageModule);
    return DemoPageModule;
}());
export { DemoPageModule };
//# sourceMappingURL=demo.module.js.map