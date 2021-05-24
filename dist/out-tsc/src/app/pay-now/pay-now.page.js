import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
// declare let paypal: any;
var PayNowPage = /** @class */ (function () {
    // user_pay_amt:boolean=true;
    function PayNowPage(alertCtrl, storage, events, globalService, spinner, router, toastController, alertController, payPal) {
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.events = events;
        this.globalService = globalService;
        this.spinner = spinner;
        this.router = router;
        this.toastController = toastController;
        this.alertController = alertController;
        this.payPal = payPal;
        this._sus_msg_show = '';
    }
    PayNowPage.prototype.ngOnInit = function () {
        this.pay_ccavenue();
    };
    PayNowPage.prototype.ionViewWillEnter = function () {
        this.pay_ccavenue();
    };
    PayNowPage.prototype.pay_ccavenue = function () {
        var _this = this;
        this.spinner.show();
        this.storage.get('plane_seleted').then(function (val) {
            _this.plane_seleted_data = val[0];
            _this.obj = new Array;
            _this.obj.push(_this.plane_seleted_data);
            _this.pay_Amount = _this.plane_seleted_data.price;
            _this.pay_id = _this.plane_seleted_data.id;
            _this.spinner.hide();
        });
        this.storage.get('user_id_set').then(function (val) {
            _this.user_id_get = val;
        });
        this.storage.get('user_login').then(function (val) {
            _this.user_login = val;
        });
        // this.spinner.hide();
    };
    PayNowPage.prototype.Payment = function () {
        var _this = this;
        // this.user_pay_amt=false
        this.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        // alert('Vivek Go for Payment---->')
        this.payPal.init({
            PayPalEnvironmentProduction: 'AQSHYTeoFI9C6OaLGt2O3S32u4Ky1lj-63CUG_i2_F-zIYaUmPs8NfyQ94WoZhJfOIKMYVvU6Twj9aPB',
            PayPalEnvironmentSandbox: 'Ab8tDhKWOPzW6ufJFF977awlIzPpFtD0E7dOxzYn4Yz3qSpIE65yR6xDEmgh4zseYg74Rm3lQW1SeN4d'
            // PayPalEnvironmentSandbox: 'AFAL9NFteRKL06zE2rFL39tKdQA5Act3JxOdMkadilNbH6VN8zWRViIC'
        }).then(function () {
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                var payment = new PayPalPayment(_this.pay_Amount, 'USD', 'Payable Amount', 'lawyer');
                _this.payPal.renderSinglePaymentUI(payment).then(function (payments) {
                    if (payments.response.state == "approved") {
                        var plan_data = {
                            apikey: _this.globalService.APIKey,
                            user_id: _this.user_id_get.user_id,
                            plan_name: _this.plane_seleted_data.plan_name,
                            plan_id: _this.plane_seleted_data.id,
                            validity: _this.plane_seleted_data.validity,
                            price: _this.plane_seleted_data.price,
                            transaction_no: payments.response.id,
                            pay_pal_token: _this.random,
                            payment_status: '1',
                        };
                        _this.globalService.plan_activate(plan_data).then(function (data) {
                            if (data['Status'] = '0') {
                                var loginData = {
                                    username: _this.user_login.email,
                                    password: _this.user_login.password,
                                };
                                _this.spinner.show();
                                _this.globalService.login_user(loginData)
                                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                    var alert_1;
                                    return tslib_1.__generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                this.userRep = data;
                                                this._status = data['ErrorCode'];
                                                this.message = data['message'];
                                                this.spinner.hide();
                                                if (!(this._status == '0')) return [3 /*break*/, 4];
                                                this.storage.set('email', this.user_login.email);
                                                localStorage.setItem('details_user', JSON.stringify(this.userRep.data));
                                                if (!(this.userRep.data[0].user_type == '2')) return [3 /*break*/, 1];
                                                this._sus_msg_show = "Payment successfully done";
                                                this.events.publish('open_app', 'lawyer');
                                                this.events.publish('userName', this.userRep.data);
                                                localStorage.setItem('open_app', JSON.stringify('lawyer'));
                                                this.router.navigateByUrl('/home');
                                                this.storage.set('user_login', '');
                                                return [3 /*break*/, 4];
                                            case 1: return [4 /*yield*/, this.alertController.create({
                                                    message: this.message,
                                                    buttons: ['OK']
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
                            }
                            else if (data['status'] = '1') {
                                // this.router.navigateByUrl('/home')
                            }
                            else {
                                // do nothing;
                            }
                        });
                    }
                }, function () {
                    _this.router.navigateByUrl('/payment-error');
                    // Error or render dialog closed without being successful
                });
            }, function () {
                // Error in configuration
            });
        }, function () {
            // Error in initialization, maybe PayPal isn't supported or something else
        });
    };
    PayNowPage = tslib_1.__decorate([
        Component({
            selector: 'app-pay-now',
            templateUrl: './pay-now.page.html',
            styleUrls: ['./pay-now.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            Storage,
            Events,
            GlobalService,
            NgxSpinnerService,
            Router,
            ToastController,
            AlertController,
            PayPal])
    ], PayNowPage);
    return PayNowPage;
}());
export { PayNowPage };
//# sourceMappingURL=pay-now.page.js.map