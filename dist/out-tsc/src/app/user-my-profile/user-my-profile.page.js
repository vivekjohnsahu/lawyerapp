import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
var UserMyProfilePage = /** @class */ (function () {
    function UserMyProfilePage(routers, globalService, spinner, router) {
        this.routers = routers;
        this.globalService = globalService;
        this.spinner = spinner;
        this.router = router;
    }
    UserMyProfilePage.prototype.ngOnInit = function () {
        this.user_prf();
    };
    UserMyProfilePage.prototype.ionViewWillEnter = function () {
        this.user_prf();
    };
    UserMyProfilePage.prototype.user_prf = function () {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('details_user'));
        this.spinner.show();
        var data = {
            "apikey": this.globalService.APIKey,
            "id": user[0].id
        };
        this.globalService.user_profile(data)
            .then(function (data) {
            _this.spinner.hide();
            _this._status = data['ErrorCode'];
            if (_this._status == '0') {
                _this.user_data = data;
                _this.user_data = _this.user_data.data.user_profile;
                _this.user_all_data = new Array;
                _this.user_all_data.push(_this.user_data);
            }
            else {
                // do nothing
            }
        });
    };
    UserMyProfilePage.prototype.edit_user = function () {
        this.router.navigateByUrl('/user-edit');
    };
    UserMyProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-user-my-profile',
            templateUrl: './user-my-profile.page.html',
            styleUrls: ['./user-my-profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            GlobalService,
            NgxSpinnerService,
            Router])
    ], UserMyProfilePage);
    return UserMyProfilePage;
}());
export { UserMyProfilePage };
//# sourceMappingURL=user-my-profile.page.js.map