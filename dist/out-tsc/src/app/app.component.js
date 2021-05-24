import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Events, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalService } from '../globalServices/global.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, router, menu, alertController, events, storage, gobalService) {
        var _this = this;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.router = router;
        this.menu = menu;
        this.alertController = alertController;
        this.events = events;
        this.storage = storage;
        this.gobalService = gobalService;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.events.subscribe('open_app', function (data) {
            _this.open_app = data;
            _this.storage.set('open_app', data);
        });
        this.storage.get('open_app').then(function (val) {
            _this.open_app = val;
        });
        var user = JSON.parse(localStorage.getItem('open_app'));
        if (user != null || user != undefined) {
            this.router.navigateByUrl('/home');
        }
        else {
            this.router.navigateByUrl('/sign-in');
        }
        this.user_details();
    }
    AppComponent.prototype.ionViewWillEnter = function () {
        this.user_details();
    };
    AppComponent.prototype.user_details = function () {
        var _this = this;
        this.events.subscribe('userName', function (data) {
            _this.userName = data;
            _this.storage.set('userName', data);
            if (_this.userName[0].company_name != undefined) {
                _this.user_name = _this.userName[0].company_name;
            }
            else {
                _this.user_name = _this.userName[0].first_name;
            }
            if (_this.userName[0].profile_image == undefined || _this.userName[0].profile_image == null || _this.userName[0].profile_image == '') {
                _this.profile_image = 'https://www.w3schools.com/howto/img_avatar.png';
            }
            else {
                _this.profile_image = _this.userName[0].profile_image;
            }
        });
        this.storage.get('userName').then(function (val) {
            _this.userName = val;
            if (_this.userName[0].company_name != undefined) {
                _this.user_name = _this.userName[0].company_name;
            }
            else {
                _this.user_name = _this.userName[0].first_name;
            }
            if (_this.userName[0].profile_image == undefined || _this.userName[0].profile_image == null || _this.userName[0].profile_image == '') {
                _this.profile_image = 'https://www.w3schools.com/howto/img_avatar.png';
            }
            else {
                _this.profile_image = _this.userName[0].profile_image;
            }
        });
    };
    AppComponent.prototype.ngOnInit = function () { };
    // user logout start
    AppComponent.prototype.logOut = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Do you want to logout',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                }, {
                                    text: 'ok',
                                    handler: function () {
                                        _this.menu.enable(false);
                                        _this.events.publish('userName', '');
                                        _this.storage.set('userName', '');
                                        localStorage.removeItem('open_app');
                                        localStorage.removeItem('lawyer_all_data');
                                        localStorage.removeItem('details_user');
                                        setTimeout(function () {
                                            _this.events.publish('open_app', '');
                                            _this.events.publish('userName', '');
                                            _this.storage.set('userName', '');
                                        }, 1000);
                                        _this.router.navigateByUrl("/sign-in");
                                    }
                                }
                            ]
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
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            Router,
            MenuController,
            AlertController,
            Events,
            Storage,
            GlobalService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map