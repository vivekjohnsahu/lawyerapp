import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuController, IonSlides, AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from '../../globalServices/global.service';
var SignInPage = /** @class */ (function () {
    function SignInPage(router, menu, alertController, splashScreen, statusBar, platform, storage, events, spinner, gobalService) {
        var _this = this;
        this.router = router;
        this.menu = menu;
        this.alertController = alertController;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.platform = platform;
        this.storage = storage;
        this.events = events;
        this.spinner = spinner;
        this.gobalService = gobalService;
        this.LoginData = {
            email: "",
            password: "",
        };
        //  validation pattern start
        var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signupform = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
        });
        this.user_login_chek();
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            _this.platform.backButton.subscribe(function () {
                if (_this.router.url == "/sign-in") {
                    _this.presentConfirm();
                }
            });
        });
    }
    SignInPage.prototype.user_login_chek = function () {
        var _this = this;
        this.events.subscribe('userName', function (data) {
            _this.user_login = data;
            _this.storage.set('userName', data);
            if (_this.user_login != '' && _this.user_login != undefined && _this.user_login != null) {
                _this.router.navigateByUrl('/home');
            }
            else {
                _this.router.navigateByUrl('/sign-in');
            }
        });
        this.storage.get('userName').then(function (val) {
            _this.user_login = val;
            if (_this.user_login != '' && _this.user_login != undefined && _this.user_login != null) {
                _this.router.navigateByUrl('/home');
            }
            else {
                _this.router.navigateByUrl('/sign-in');
            }
        });
    };
    SignInPage.prototype.ngOnInit = function () {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#fff;');
    };
    // manu bar hide
    SignInPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    // user login validation start
    SignInPage.prototype.login = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loginData;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                loginData = {
                    username: this.LoginData.email,
                    password: this.LoginData.password,
                };
                this.spinner.show();
                this.gobalService.login_user(loginData)
                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var alert_1, alert_2, user_login, alert_3, alert_4;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.userRep = data;
                                this._status = data['ErrorCode'];
                                this.message = data['message'];
                                this.spinner.hide();
                                this.storage.set('email', this.LoginData.email);
                                if (!(this._status == '0')) return [3 /*break*/, 6];
                                localStorage.setItem('details_user', JSON.stringify(this.userRep.data));
                                if (!(this.userRep.data[0].user_type == '3')) return [3 /*break*/, 1];
                                this.events.publish('open_app', 'user');
                                this.events.publish('userName', this.userRep.data);
                                localStorage.setItem('open_app', JSON.stringify('user'));
                                this.router.navigateByUrl('/home');
                                this.signupform.reset();
                                return [3 /*break*/, 5];
                            case 1:
                                if (!(this.userRep.data[0].user_type == '2')) return [3 /*break*/, 2];
                                this.events.publish('open_app', 'lawyer');
                                this.events.publish('userName', this.userRep.data);
                                localStorage.setItem('open_app', JSON.stringify('lawyer'));
                                this.router.navigateByUrl('/home');
                                this.signupform.reset();
                                return [3 /*break*/, 5];
                            case 2: return [4 /*yield*/, this.alertController.create({
                                    message: this.message,
                                    buttons: ['OK']
                                })];
                            case 3:
                                alert_1 = _a.sent();
                                return [4 /*yield*/, alert_1.present()];
                            case 4:
                                _a.sent();
                                _a.label = 5;
                            case 5: return [3 /*break*/, 16];
                            case 6:
                                if (!(this._status == '2')) return [3 /*break*/, 9];
                                return [4 /*yield*/, this.alertController.create({
                                        message: this.message,
                                        buttons: [{
                                                text: 'Ok',
                                                handler: function () {
                                                    _this.router.navigateByUrl('/verify-otp');
                                                    _this.signupform.reset();
                                                }
                                            }]
                                    })];
                            case 7:
                                alert_2 = _a.sent();
                                return [4 /*yield*/, alert_2.present()];
                            case 8:
                                _a.sent();
                                return [3 /*break*/, 16];
                            case 9:
                                if (!(this._status == '3')) return [3 /*break*/, 10];
                                user_login = {
                                    email: this.LoginData.email,
                                    password: this.LoginData.password
                                };
                                this.storage.set('user_login', user_login);
                                this.storage.set('user_id_set', data);
                                this.router.navigateByUrl('/plan');
                                return [3 /*break*/, 16];
                            case 10:
                                if (!(this._status == '4')) return [3 /*break*/, 13];
                                return [4 /*yield*/, this.alertController.create({
                                        message: this.message,
                                        buttons: ['OK']
                                    })];
                            case 11:
                                alert_3 = _a.sent();
                                return [4 /*yield*/, alert_3.present()];
                            case 12:
                                _a.sent();
                                return [3 /*break*/, 16];
                            case 13:
                                if (!(this._status == '1')) return [3 /*break*/, 16];
                                return [4 /*yield*/, this.alertController.create({
                                        message: 'You are not register.',
                                        buttons: ['OK']
                                    })];
                            case 14:
                                alert_4 = _a.sent();
                                return [4 /*yield*/, alert_4.present()];
                            case 15:
                                _a.sent();
                                _a.label = 16;
                            case 16: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    // app exit code start
    SignInPage.prototype.presentConfirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                navigator['app'].exitApp();
                return [2 /*return*/];
            });
        });
    };
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], SignInPage.prototype, "slides", void 0);
    SignInPage = tslib_1.__decorate([
        Component({
            selector: 'app-sign-in',
            templateUrl: './sign-in.page.html',
            styleUrls: ['./sign-in.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            MenuController,
            AlertController,
            SplashScreen,
            StatusBar,
            Platform,
            Storage,
            Events,
            NgxSpinnerService,
            GlobalService])
    ], SignInPage);
    return SignInPage;
}());
export { SignInPage };
//# sourceMappingURL=sign-in.page.js.map