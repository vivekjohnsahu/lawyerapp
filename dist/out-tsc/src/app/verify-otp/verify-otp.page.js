import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
var VerifyOtpPage = /** @class */ (function () {
    function VerifyOtpPage(router, toastController, alertController, gobalService, menu, splashScreen, statusBar, spinner, storage) {
        this.router = router;
        this.toastController = toastController;
        this.alertController = alertController;
        this.gobalService = gobalService;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.spinner = spinner;
        this.storage = storage;
        this.get_otp = {
            otp: "",
        };
        this.sent_otp = new FormGroup({
            otp: new FormControl('', [Validators.required]),
        });
    }
    VerifyOtpPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('otp_type').then(function (val) {
            _this.otp_type = val;
        });
        this.storage.get('email').then(function (val) {
            _this.email = val;
        });
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
    };
    VerifyOtpPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    VerifyOtpPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    VerifyOtpPage.prototype.otp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var otpDataObj;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                otpDataObj = {
                    'email': this.email,
                    'otp': this.get_otp.otp,
                    'apikey': this.gobalService.APIKey,
                };
                this.spinner.show();
                if (this.get_otp.otp.length == 4) {
                    this.gobalService.email_verify_otp(otpDataObj)
                        .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var toast;
                        return tslib_1.__generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this._status = data['ErrorCode'];
                                    this.Message = data['message'];
                                    this.spinner.hide();
                                    if (!(this._status == '0')) return [3 /*break*/, 1];
                                    this.router.navigateByUrl('/sign-in');
                                    this.sent_otp.reset();
                                    return [3 /*break*/, 3];
                                case 1:
                                    if (!(this._status == '1')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, this.toastController.create({
                                            message: 'Please fill the valid Otp',
                                            position: 'bottom',
                                            color: "dark",
                                            duration: 3000
                                        })];
                                case 2:
                                    toast = _a.sent();
                                    toast.present();
                                    _a.label = 3;
                                case 3: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
            });
        });
    };
    // resend otp code start
    VerifyOtpPage.prototype.resend_otp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Are you sure you want to resend otp.',
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                },
                                {
                                    text: 'ok',
                                    handler: function () {
                                        _this.re_sent_otp();
                                    }
                                }]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VerifyOtpPage.prototype.re_sent_otp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var otpDataObj;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                otpDataObj = {
                    'email': this.email,
                    'apikey': this.gobalService.APIKey,
                };
                this.spinner.show();
                this.gobalService.forgot_password(otpDataObj)
                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _status, toast, toast;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.spinner.hide();
                                _status = data['ErrorCode'];
                                if (!(_status == '0')) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.toastController.create({
                                        message: 'Send otp your register mobile no.',
                                        position: 'bottom',
                                        color: "success",
                                        duration: 3000
                                    })];
                            case 1:
                                toast = _a.sent();
                                toast.present();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, this.toastController.create({
                                    message: 'Not send otp.',
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
                return [2 /*return*/];
            });
        });
    };
    VerifyOtpPage.prototype.numberAccept = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    VerifyOtpPage = tslib_1.__decorate([
        Component({
            selector: 'app-verify-otp',
            templateUrl: './verify-otp.page.html',
            styleUrls: ['./verify-otp.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ToastController,
            AlertController,
            GlobalService,
            MenuController,
            SplashScreen,
            StatusBar,
            NgxSpinnerService,
            Storage])
    ], VerifyOtpPage);
    return VerifyOtpPage;
}());
export { VerifyOtpPage };
//# sourceMappingURL=verify-otp.page.js.map