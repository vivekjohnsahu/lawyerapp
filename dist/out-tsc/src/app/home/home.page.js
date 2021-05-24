import * as tslib_1 from "tslib";
import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
// import { ModalpagePage } from '../modalpage/modalpage.page'; 
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Events, MenuController, Platform, IonSlides } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IonInfiniteScroll } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
var HomePage = /** @class */ (function () {
    // limit = 10;
    function HomePage(router, route, navCtrl, modalController, menu, splashScreen, statusBar, platform, alertCtrl, storage, events, globalService, spinner, alertController, toastController, localNotifications) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.navCtrl = navCtrl;
        this.modalController = modalController;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.platform = platform;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.events = events;
        this.globalService = globalService;
        this.spinner = spinner;
        this.alertController = alertController;
        this.toastController = toastController;
        this.localNotifications = localNotifications;
        this.lawyer_not_found_vl = 2;
        this.banner_hide = true;
        platform.ready().then(function () {
            statusBar.styleDefault();
            splashScreen.hide();
            _this.platform.backButton.subscribe(function () {
                if (_this.router.url == "/home") {
                    _this.presentConfirm();
                }
            });
        });
        // this.platform.ready().then((readySource) => {
        // 	console.log('Platform ready from', readySource);
        //   });
        this.events.subscribe('open_app', function (data) {
            _this.open_app = data;
            _this.storage.set('open_app', data);
        });
        this.storage.get('open_app').then(function (val) {
            _this.open_app = val;
        });
        // this.user_login_chek()
        this.platform.ready().then(function () {
            _this.localNotifications.on('click').subscribe(function (res) {
                var msg = res.data ? res.data.mydata : '';
                // this.showAlert(res.title, res.text, msg);
            });
            _this.localNotifications.on('trigger').subscribe(function (res) {
                var msg = res.data ? res.data.mydata : '';
                // this.showAlert(res.title, res.text, msg);
            });
        });
    }
    HomePage.prototype.scheduleNotification = function (day) {
        this.localNotifications.schedule({
            id: 1,
            //   icon: '../../assets/images/icon.png',
            //   icon: "https://www.w3schools.com/howto/img_avatar.png",
            title: "Lawyer's",
            text: 'Your plan is deactivated ' + day + ' day',
            data: { mydata: 'Your plan is deactivated ' + day + ' day' },
            trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
            foreground: true
        });
    };
    // showAlert(header, sub, msg) {
    // 	this.alertController.create({
    // 		header: header,
    // 		subHeader: sub,
    // 		message: msg,
    // 		buttons: ['Ok']
    // 	}).then(alert => alert.present());
    // }
    HomePage.prototype.user_login_chek = function () {
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
    HomePage.prototype.filterFun = function () {
        var FilterUser = JSON.parse(localStorage.getItem('FilterData'));
        if (FilterUser != '' && FilterUser != undefined && FilterUser != null) {
            this.banner_hide = false;
            this.lawyerFirm = new Array;
            this.lawyerFirm.push(FilterUser);
            this.lawyerFirm = this.lawyerFirm[0].data;
            localStorage.removeItem('FilterData');
        }
    };
    HomePage.prototype.ngOnInit = function () {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
        // this.lawyer_list()
    };
    HomePage.prototype.ionViewWillEnter = function () {
        this.user_login_chek();
        var FilterUser = JSON.parse(localStorage.getItem('FilterData'));
        if (FilterUser == '' || FilterUser == null || FilterUser == undefined) {
            this.lawyer_list();
        }
        else {
            this.filterFun();
        }
        this.menu.enable(true);
        var subscribe_ = JSON.parse(localStorage.getItem('open_app'));
        if (subscribe_ == 'lawyer') {
            this.get_notification_set();
        }
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    HomePage.prototype.lawyer_list = function () {
        var _this = this;
        this.banner_hide = true;
        this.spinner.show();
        var data = {
            "apikey": this.globalService.APIKey
        };
        this.globalService.lawyer_firm_list(data)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _status, lawyer_data, alert_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _status = data['ErrorCode'];
                        lawyer_data = data;
                        this.spinner.hide();
                        if (!(_status == '0')) return [3 /*break*/, 1];
                        this.lawyer_not_found = data['data'];
                        this.lawyerFirm = new Array;
                        this.lawyerFirm.push(data);
                        this.lawyerFirm = this.lawyerFirm[0].data;
                        if (this.lawyer_not_found == false || this.lawyer_not_found == undefined || this.lawyer_not_found == null || this.lawyer_not_found == '') {
                            setTimeout(function () {
                                _this.lawyer_not_found_vl = 1;
                            }, 500);
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        if (!(_status == '1')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.alertCtrl.create({
                                message: 'Lawyer firm is blank',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                    },
                                ]
                            })];
                    case 2:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    HomePage.prototype.get_notification_set = function () {
        var _this = this;
        var User = JSON.parse(localStorage.getItem('details_user'));
        var data = {
            apikey: this.globalService.APIKey,
            user_id: User[0].id
        };
        this.globalService.get_notification(data)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _status, alert_2, toast;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _status = data['ErrorCode'];
                        this.logout = data['day'];
                        if (!(_status == '1')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Your plan is deactivated',
                                backdropDismiss: false,
                                buttons: [
                                    {
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
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(_status == '2')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.toastController.create({
                                message: 'Your plan is deactivated ' + this.logout + ' day',
                                position: 'top',
                                color: "dark",
                                duration: 2000
                            })];
                    case 4:
                        toast = _a.sent();
                        toast.present();
                        this.scheduleNotification(this.logout);
                        return [3 /*break*/, 6];
                    case 5:
                        if (_status == '0') {
                            // do nothing
                        }
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
    };
    HomePage.prototype.presentConfirm = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                navigator['app'].exitApp();
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.doRefresh = function (event) {
        this.lawyer_list();
        setTimeout(function () {
            event.target.complete();
        }, 700);
    };
    HomePage.prototype.lawyer_details = function (id) {
        this.router.navigateByUrl('/firm-details' + '/' + id);
    };
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], HomePage.prototype, "slides", void 0);
    tslib_1.__decorate([
        ViewChild(IonInfiniteScroll),
        tslib_1.__metadata("design:type", IonInfiniteScroll)
    ], HomePage.prototype, "infiniteScroll", void 0);
    HomePage = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
            providers: [LocalNotifications]
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            NavController,
            ModalController,
            MenuController,
            SplashScreen,
            StatusBar,
            Platform,
            AlertController,
            Storage,
            Events,
            GlobalService,
            NgxSpinnerService,
            AlertController,
            ToastController,
            LocalNotifications])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map