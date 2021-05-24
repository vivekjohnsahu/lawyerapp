import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController, MenuController, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
var OtpPage = /** @class */ (function () {
    function OtpPage(toastController, router, alertController, menu, splashScreen, statusBar, gobalService, spinner, storage) {
        this.toastController = toastController;
        this.router = router;
        this.alertController = alertController;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.gobalService = gobalService;
        this.spinner = spinner;
        this.storage = storage;
        this.get_otp = {
            otp: "",
        };
        //  validation pattern start
        this.sent_otp = new FormGroup({
            otp: new FormControl('', [Validators.required]),
        });
    }
    OtpPage.prototype.ngOnInit = function () {
        var _this = this;
        this.storage.get('email_otp').then(function (val) {
            _this.email_otp = val;
        });
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
    };
    // manu bar hide
    OtpPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    // manu bar show leave page
    OtpPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    OtpPage.prototype.otp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var len_otp, toast, forgot_otp_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        len_otp = this.get_otp.otp.length;
                        if (!(len_otp < 4)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.toastController.create({
                                message: 'Please fill the valid Otp',
                                position: 'bottom',
                                color: "dark",
                                duration: 3000
                            })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [3 /*break*/, 3];
                    case 2:
                        this.spinner.show();
                        forgot_otp_1 = {
                            'email': this.email_otp.email,
                            'apikey': this.gobalService.APIKey,
                            'otp': this.get_otp.otp,
                        };
                        this.gobalService.email_verify_otp(forgot_otp_1)
                            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var toast;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.spinner.hide();
                                        this._status = data['ErrorCode'];
                                        if (!(this._status == '0')) return [3 /*break*/, 1];
                                        this.storage.set('vrfy_email_otp_', forgot_otp_1);
                                        this.router.navigateByUrl('/create-password');
                                        this.sent_otp.reset();
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this.toastController.create({
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
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // resend otp code start
    OtpPage.prototype.resend_otp = function () {
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
    OtpPage.prototype.re_sent_otp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var forgot;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.storage.get('email_otp').then(function (val) {
                    _this.email_otp = val;
                });
                forgot = {
                    'email': this.email_otp.email,
                    'apikey': this.gobalService.APIKey
                };
                this.spinner.show();
                this.gobalService.forgot_password(forgot)
                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var _status, toast, toast;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.spinner.hide();
                                _status = data['ErrorCode'];
                                if (!(_status == '0')) return [3 /*break*/, 2];
                                return [4 /*yield*/, this.toastController.create({
                                        message: 'Otp send your register mobile no.',
                                        position: 'bottom',
                                        color: "success",
                                        duration: 3000
                                    })];
                            case 1:
                                toast = _a.sent();
                                toast.present();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, this.toastController.create({
                                    message: 'Do not send otp.',
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
    OtpPage.prototype.numberAccept = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], OtpPage.prototype, "slides", void 0);
    OtpPage = tslib_1.__decorate([
        Component({
            selector: 'app-otp',
            templateUrl: './otp.page.html',
            styleUrls: ['./otp.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            Router,
            AlertController,
            MenuController,
            SplashScreen,
            StatusBar,
            GlobalService,
            NgxSpinnerService,
            Storage])
    ], OtpPage);
    return OtpPage;
}());
export { OtpPage };
//# sourceMappingURL=otp.page.js.map