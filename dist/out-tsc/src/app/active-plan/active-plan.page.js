import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
var ActivePlanPage = /** @class */ (function () {
    function ActivePlanPage(gobalService, spinner) {
        this.gobalService = gobalService;
        this.spinner = spinner;
    }
    ActivePlanPage.prototype.ngOnInit = function () {
        this.plan_list();
    };
    ActivePlanPage.prototype.ionViewWillEnter = function () {
        this.plan_list();
    };
    ActivePlanPage.prototype.plan_list = function () {
        var _this = this;
        this.spinner.show();
        var User = JSON.parse(localStorage.getItem('details_user'));
        var key = {
            'apikey': this.gobalService.APIKey,
            'user_id': User[0].id
        };
        this.gobalService.plan(key)
            .then(function (data) {
            _this.spinner.hide();
            _this.active_plan = data;
            _this.active_plan = _this.active_plan.data;
        });
    };
    ActivePlanPage = tslib_1.__decorate([
        Component({
            selector: 'app-active-plan',
            templateUrl: './active-plan.page.html',
            styleUrls: ['./active-plan.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GlobalService,
            NgxSpinnerService])
    ], ActivePlanPage);
    return ActivePlanPage;
}());
export { ActivePlanPage };
//# sourceMappingURL=active-plan.page.js.map