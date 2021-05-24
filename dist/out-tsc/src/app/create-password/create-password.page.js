import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController, MenuController, IonSlides } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
var CreatePasswordPage = /** @class */ (function () {
    function CreatePasswordPage(alertController, toastController, menu, splashScreen, statusBar, globalService, spinner, storage, router) {
        this.alertController = alertController;
        this.toastController = toastController;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.globalService = globalService;
        this.spinner = spinner;
        this.storage = storage;
        this.router = router;
        this.change_pw = {
            new_password: "",
            comf_password: "",
        };
        //  validation pattern start
        this.changePassword = new FormGroup({
            new_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
            comf_password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
        });
    }
    CreatePasswordPage.prototype.ngOnInit = function () {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
        // this.storage.get('vrfy_email_otp_').then((val) => {
        // 	this.vrfy_email_otp_ = val;
        // });	
        // this.storage.get('email_otp').then((val) => {
        // 	this.user_type = val;
        // });	
    };
    CreatePasswordPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
        // this.storage.get('vrfy_email_otp_').then((val) => {
        // 	this.vrfy_email_otp_ = val;
        // });	
        // this.storage.get('email_otp').then((val) => {
        // 	this.user_type = val;
        // });	
    };
    CreatePasswordPage.prototype.changePass = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, alert_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = JSON.parse(localStorage.getItem('open_app'));
                        if (!(this.change_pw.new_password != this.change_pw.comf_password)) return [3 /*break*/, 3];
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
                        if (this.change_pw.new_password && this.change_pw.comf_password) {
                            this.spinner.show();
                            this.storage.get('vrfy_email_otp_').then(function (val) {
                                _this.vrfy_email_otp_ = val;
                            });
                            this.storage.get('email_otp').then(function (val) {
                                _this.user_type = val;
                                console.log(_this.user_type);
                            });
                            setTimeout(function () {
                                var newPass = {
                                    'email': _this.vrfy_email_otp_.email,
                                    'apikey': _this.globalService.APIKey,
                                    'password': _this.change_pw.comf_password,
                                    'user_type': _this.user_type.user_type
                                };
                                _this.globalService.create_new_pass(newPass)
                                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var alert_2, toast;
                                    var _this = this;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                this._status = data['ErrorCode'];
                                                this.spinner.hide();
                                                if (!(this._status == '0')) return [3 /*break*/, 3];
                                                return [4 /*yield*/, this.alertController.create({
                                                        message: 'successfully changed your password.',
                                                        buttons: [{
                                                                text: 'Ok',
                                                                handler: function () {
                                                                    _this.router.navigateByUrl('/sign-in');
                                                                    _this.changePassword.reset();
                                                                }
                                                            }]
                                                    })];
                                            case 1:
                                                alert_2 = _a.sent();
                                                return [4 /*yield*/, alert_2.present()];
                                            case 2:
                                                _a.sent();
                                                return [3 /*break*/, 5];
                                            case 3: return [4 /*yield*/, this.toastController.create({
                                                    message: 'Do not create your password try again.',
                                                    position: 'bottom',
                                                    color: "dark",
                                                    duration: 3000
                                                })];
                                            case 4:
                                                toast = _a.sent();
                                                toast.present();
                                                _a.label = 5;
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }, 1000);
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // manu bar hide
    // ionViewWillEnter() {
    // 	this.menu.enable(false);
    // }
    // manu bar show leave page
    CreatePasswordPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], CreatePasswordPage.prototype, "slides", void 0);
    CreatePasswordPage = tslib_1.__decorate([
        Component({
            selector: 'app-create-password',
            templateUrl: './create-password.page.html',
            styleUrls: ['./create-password.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            ToastController,
            MenuController,
            SplashScreen,
            StatusBar,
            GlobalService,
            NgxSpinnerService,
            Storage,
            Router])
    ], CreatePasswordPage);
    return CreatePasswordPage;
}());
export { CreatePasswordPage };
//# sourceMappingURL=create-password.page.js.map