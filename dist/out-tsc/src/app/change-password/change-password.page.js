import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(alertController, toastController, globalService, spinner) {
        this.alertController = alertController;
        this.toastController = toastController;
        this.globalService = globalService;
        this.spinner = spinner;
        this.change_pw = {
            old_password: "",
            new_password: "",
            comf_password: "",
        };
        //  validation pattern start
        this.changePassword = new FormGroup({
            old_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
            new_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
            comf_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
        });
        //  validation pattern end
    }
    // alert box start
    ChangePasswordPage.prototype.changePass = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert_1, user, FilterUser;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.spinner.show();
                        if (!(this.change_pw.new_password != this.change_pw.comf_password)) return [3 /*break*/, 3];
                        this.spinner.hide();
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Confirm Password does not match the New Password .',
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (this.change_pw.old_password && this.change_pw.new_password && this.change_pw.comf_password) {
                            user = JSON.parse(localStorage.getItem('details_user'));
                            FilterUser = JSON.parse(localStorage.getItem('details_user'));
                            if (FilterUser[0].user_type == '3') {
                                this.user_type_nr = "1";
                            }
                            else if (FilterUser[0].user_type == '2') {
                                this.user_type_nr = "2";
                            }
                            this.user_change_pasw = {
                                "old_password": this.change_pw.old_password,
                                "new_password": this.change_pw.new_password,
                                "apikey": this.globalService.APIKey,
                                "user_id": user[0].id,
                                "user_type": this.user_type_nr
                            };
                            this.globalService.change_pass(this.user_change_pasw)
                                .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toast, toast;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.spinner.hide();
                                            this._status = data['ErrorCode'];
                                            this.user_type = data['user_type'];
                                            if (!(this._status == '0')) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.toastController.create({
                                                    message: 'Successfully changed your password.',
                                                    position: 'bottom',
                                                    color: "success",
                                                    duration: 3000
                                                })];
                                        case 1:
                                            toast = _a.sent();
                                            toast.present();
                                            return [3 /*break*/, 4];
                                        case 2:
                                            if (!(this._status == '1')) return [3 /*break*/, 4];
                                            return [4 /*yield*/, this.toastController.create({
                                                    message: 'Do not changed your password.',
                                                    position: 'bottom',
                                                    color: "dark",
                                                    duration: 3000
                                                })];
                                        case 3:
                                            toast = _a.sent();
                                            toast.present();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            this.changePassword.reset();
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ChangePasswordPage.prototype.ngOnInit = function () {
    };
    ChangePasswordPage = tslib_1.__decorate([
        Component({
            selector: 'app-change-password',
            templateUrl: './change-password.page.html',
            styleUrls: ['./change-password.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            ToastController,
            GlobalService,
            NgxSpinnerService])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());
export { ChangePasswordPage };
//# sourceMappingURL=change-password.page.js.map