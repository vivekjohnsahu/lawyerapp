import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MenuController, IonSlides } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
var ForgotpasswordPage = /** @class */ (function () {
    function ForgotpasswordPage(toastController, router, menu, splashScreen, statusBar, gobalService, spinner, storage) {
        this.toastController = toastController;
        this.router = router;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.gobalService = gobalService;
        this.spinner = spinner;
        this.storage = storage;
        this.forgotData = {
            email: "",
        };
        this.regExEmail = "^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
        //  validation pattern start
        var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.Forgot_Passform = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),
        });
    }
    ForgotpasswordPage.prototype.ngOnInit = function () {
        this.menu.enable(false);
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
    };
    // manu bar hide
    ForgotpasswordPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    // manu bar show leave page
    ForgotpasswordPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    // Forgot Password function start
    ForgotpasswordPage.prototype.Forgot_Pass = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast, forgot;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.forgotData.email.match(this.regExEmail)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.toastController.create({
                                message: 'Invalid email address.',
                                position: 'bottom',
                                color: "dark",
                                duration: 2000
                            })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [3 /*break*/, 3];
                    case 2:
                        this.spinner.show();
                        forgot = {
                            'email': this.forgotData.email,
                            'apikey': this.gobalService.APIKey
                        };
                        this.gobalService.forgot_password(forgot)
                            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var toast;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this.spinner.hide();
                                        this._status = data['ErrorCode'];
                                        this.user_type = data['user_type'];
                                        if (!(this._status == '0')) return [3 /*break*/, 1];
                                        this.storage.set('email_otp', this.user_type);
                                        this.router.navigateByUrl('/otp');
                                        this.Forgot_Passform.reset();
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this.toastController.create({
                                            message: 'Please enter a valid Email ID',
                                            position: 'bottom',
                                            color: "dark",
                                            duration: 2000
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
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], ForgotpasswordPage.prototype, "slides", void 0);
    ForgotpasswordPage = tslib_1.__decorate([
        Component({
            selector: 'app-forgotpassword',
            templateUrl: './forgotpassword.page.html',
            styleUrls: ['./forgotpassword.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ToastController,
            Router,
            MenuController,
            SplashScreen,
            StatusBar,
            GlobalService,
            NgxSpinnerService,
            Storage])
    ], ForgotpasswordPage);
    return ForgotpasswordPage;
}());
export { ForgotpasswordPage };
//# sourceMappingURL=forgotpassword.page.js.map