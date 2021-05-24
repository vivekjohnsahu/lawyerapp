import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SearchPage } from './search.page';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from 'ngx-spinner';
var routes = [
    {
        path: '',
        component: SearchPage
    }
];
var SearchPageModule = /** @class */ (function () {
    function SearchPageModule() {
    }
    SearchPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                Ng2SearchPipeModule,
                NgxSpinnerModule,
                RouterModule.forChild(routes)
            ],
            declarations: [
                SearchPage,
            ]
        })
    ], SearchPageModule);
    return SearchPageModule;
}());
export { SearchPageModule };
//# sourceMappingURL=search.module.js.map