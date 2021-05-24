import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GlobalService } from '../../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
var TermsPage = /** @class */ (function () {
    function TermsPage(globalService, spinner) {
        this.globalService = globalService;
        this.spinner = spinner;
    }
    TermsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.spinner.show();
        var key = {
            "apikey": this.globalService.APIKey
        };
        this.globalService.Term_condition(key)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.spinner.hide();
                this.Term_condition = data;
                this.Term_condition = this.Term_condition.data.description;
                return [2 /*return*/];
            });
        }); });
    };
    TermsPage = tslib_1.__decorate([
        Component({
            selector: 'app-terms',
            templateUrl: './terms.page.html',
            styleUrls: ['./terms.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [GlobalService,
            NgxSpinnerService])
    ], TermsPage);
    return TermsPage;
}());
export { TermsPage };
//# sourceMappingURL=terms.page.js.map