import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GlobalService } from '../../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
var AboutUsPage = /** @class */ (function () {
    function AboutUsPage(globalService, spinner) {
        this.globalService = globalService;
        this.spinner = spinner;
    }
    AboutUsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        var key = {
            "apikey": this.globalService.APIKey
        };
        this.globalService.about_us(key)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.spinner.hide();
                this.about_us = data;
                this.about_us = this.about_us.data.description;
                return [2 /*return*/];
            });
        }); });
    };
    AboutUsPage = tslib_1.__decorate([
        Component({
            selector: 'app-about-us',
            templateUrl: './about-us.page.html',
            styleUrls: ['./about-us.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GlobalService,
            NgxSpinnerService])
    ], AboutUsPage);
    return AboutUsPage;
}());
export { AboutUsPage };
//# sourceMappingURL=about-us.page.js.map