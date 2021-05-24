import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../../globalServices/global.service';
import { Router } from '@angular/router';
var SearchPage = /** @class */ (function () {
    function SearchPage(spinner, gobalService, router) {
        this.spinner = spinner;
        this.gobalService = gobalService;
        this.router = router;
        this.no_data = 1;
    }
    SearchPage.prototype.getISkill = function (e) {
        var _this = this;
        this.user_name = this.term;
        if (e.length > 1) {
            var obj = {
                'apikey': this.gobalService.APIKey,
                'keyword': e
            };
            this.gobalService.search(obj)
                .then(function (data) {
                _this._status = data['ErrorCode'];
                _this.Message = data['message'];
                if (_this._status == 0) {
                    _this.no_data = 1;
                    _this.search_cmt = data;
                    _this.search_cmt = _this.search_cmt.data;
                }
                else {
                    _this.no_data = 2;
                }
            });
        }
    };
    SearchPage.prototype.go_to_all = function (id) {
        this.router.navigateByUrl('/firm-details' + '/' + id);
    };
    SearchPage.prototype.ngOnInit = function () {
    };
    SearchPage = tslib_1.__decorate([
        Component({
            selector: 'app-search',
            templateUrl: './search.page.html',
            styleUrls: ['./search.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NgxSpinnerService,
            GlobalService,
            Router])
    ], SearchPage);
    return SearchPage;
}());
export { SearchPage };
//# sourceMappingURL=search.page.js.map