import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';
var UserEditPage = /** @class */ (function () {
    function UserEditPage(routers, globalService, spinner, router, alertController, events) {
        this.routers = routers;
        this.globalService = globalService;
        this.spinner = spinner;
        this.router = router;
        this.alertController = alertController;
        this.events = events;
        this.userData = {
            apikey: '',
            first_name: "",
            last_name: "",
            mobile: "",
        };
        this.signupUser = new FormGroup({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl(),
            mobile: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
        });
    }
    UserEditPage.prototype.ngOnInit = function () {
        this.user_prf();
    };
    UserEditPage.prototype.user_prf = function () {
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
                _this.userData = _this.user_data;
                _this.userData.mobile = _this.user_data.contact_number1;
            }
            else {
                // do nothing
            }
        });
    };
    UserEditPage.prototype.edit_Up = function () {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('details_user'));
        this.spinner.show();
        var data = {
            "apikey": this.globalService.APIKey,
            "first_name": this.user_data.first_name,
            "last_name": this.user_data.last_name,
            "mobile": this.user_data.mobile,
            "id": user[0].id
        };
        this.globalService.user_profile_edit(data)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var Message, _status, alert_1, alert_2, alert_3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Message = data['message'];
                        _status = data['ErrorCode'];
                        this.spinner.hide();
                        if (!(_status == '0')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: Message,
                                buttons: [{
                                        text: 'Ok',
                                        handler: function () {
                                            _this.userData_set = data;
                                            _this.userData_set = _this.userData_set.data;
                                            var saveData = {
                                                0: _this.userData_set
                                            };
                                            localStorage.setItem('details_user', JSON.stringify(saveData));
                                            _this.events.publish('userName', saveData);
                                            _this.router.navigateByUrl('/user-my-profile');
                                        }
                                    }]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!(this._status == '1')) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.alertController.create({
                                message: Message,
                                buttons: [{ text: 'Ok', }]
                            })];
                    case 4:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 6: return [4 /*yield*/, this.alertController.create({
                            message: 'You have not edit your profile try again.',
                            buttons: [{ text: 'Close' }]
                        })];
                    case 7:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [2 /*return*/];
                }
            });
        }); });
    };
    UserEditPage = tslib_1.__decorate([
        Component({
            selector: 'app-user-edit',
            templateUrl: './user-edit.page.html',
            styleUrls: ['./user-edit.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            GlobalService,
            NgxSpinnerService,
            Router,
            AlertController,
            Events])
    ], UserEditPage);
    return UserEditPage;
}());
export { UserEditPage };
//# sourceMappingURL=user-edit.page.js.map