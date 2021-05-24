import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, AlertController, MenuController, IonSlides } from '@ionic/angular';
import { GlobalService } from '../../globalServices/global.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
var RegisterUserPage = /** @class */ (function () {
    function RegisterUserPage(router, alertController, gobalService, menu, splashScreen, statusBar, spinner, storage, toastController) {
        this.router = router;
        this.alertController = alertController;
        this.gobalService = gobalService;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.spinner = spinner;
        this.storage = storage;
        this.toastController = toastController;
        this.userData = {
            apikey: '',
            first_name: "",
            last_name: "",
            email: "",
            mobile: "",
            password: ""
        };
        //  validation pattern start
        var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signupUser = new FormGroup({
            first_name: new FormControl('', [Validators.required]),
            last_name: new FormControl(),
            email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),
            mobile: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
        });
    }
    RegisterUserPage.prototype.ngOnInit = function () {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
    };
    // manu bar hide
    RegisterUserPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    // manu bar show leave page
    RegisterUserPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    RegisterUserPage.prototype.signUp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.userData = {
                    "apikey": this.gobalService.APIKey,
                    "first_name": this.userData.first_name,
                    "last_name": this.userData.last_name,
                    "email": this.userData.email,
                    "mobile": this.userData.mobile,
                    "password": this.userData.password,
                };
                this.spinner.show();
                this.gobalService.register_user(this.userData)
                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var toast, alert_1, alert_2;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.spinner.hide();
                                this._status = data['ErrorCode'];
                                this.Message = data['message'];
                                if (!(this._status == '0')) return [3 /*break*/, 2];
                                this.storage.set('otp_type', '1');
                                this.storage.set('email', this.userData.email);
                                this.router.navigateByUrl('/verify-otp');
                                return [4 /*yield*/, this.toastController.create({
                                        message: 'sent otp your register email id.',
                                        position: 'top',
                                        color: "dark",
                                        duration: 3000
                                    })];
                            case 1:
                                toast = _a.sent();
                                toast.present();
                                this.signupUser.reset();
                                return [3 /*break*/, 8];
                            case 2:
                                if (!(this._status == '1')) return [3 /*break*/, 5];
                                return [4 /*yield*/, this.alertController.create({
                                        message: this.Message,
                                        buttons: [{ text: 'Ok', }]
                                    })];
                            case 3:
                                alert_1 = _a.sent();
                                return [4 /*yield*/, alert_1.present()];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 8];
                            case 5: return [4 /*yield*/, this.alertController.create({
                                    message: 'You have not registered try again.',
                                    buttons: [{ text: 'Close' }]
                                })];
                            case 6:
                                alert_2 = _a.sent();
                                return [4 /*yield*/, alert_2.present()];
                            case 7:
                                _a.sent();
                                _a.label = 8;
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    RegisterUserPage.prototype.numberAccept = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], RegisterUserPage.prototype, "slides", void 0);
    RegisterUserPage = tslib_1.__decorate([
        Component({
            selector: 'app-register-user',
            templateUrl: './register-user.page.html',
            styleUrls: ['./register-user.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            AlertController,
            GlobalService,
            MenuController,
            SplashScreen,
            StatusBar,
            NgxSpinnerService,
            Storage,
            ToastController])
    ], RegisterUserPage);
    return RegisterUserPage;
}());
export { RegisterUserPage };
//# sourceMappingURL=register-user.page.js.map