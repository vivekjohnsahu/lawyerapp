import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AlertController, Platform, ToastController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var PlanPage = /** @class */ (function () {
    function PlanPage(alertController, gobalService, spinner, router, toastController, storage, platform, events) {
        var _this = this;
        this.alertController = alertController;
        this.gobalService = gobalService;
        this.spinner = spinner;
        this.router = router;
        this.toastController = toastController;
        this.storage = storage;
        this.platform = platform;
        this.events = events;
        this.plan_Bronze_plan_page_shoe = 0;
        this.plan_gold_plan_page_shoe = 0;
        this.plan_silver_plan_page_shoe = 0;
        this.button_skip_plan = false;
        platform.ready().then(function () {
            _this.platform.backButton.subscribe(function () {
                if (_this.router.url == "/plan") {
                    _this.presentConfirm();
                }
            });
        });
        this.storage.get('user_id_set').then(function (val) {
            _this.user_id_get = val;
            _this.chek_skip_plan();
        });
        this.storage.get('user_login').then(function (val) {
            _this.user_login = val;
        });
    }
    PlanPage.prototype.ngOnInit = function () {
        this.plan_list();
    };
    PlanPage.prototype.presentConfirm = function () {
        navigator['app'].exitApp();
    };
    PlanPage.prototype.plan_list = function () {
        var _this = this;
        this.spinner.show();
        this.key = {
            'apikey': this.gobalService.APIKey
        };
        this.gobalService.plan(this.key)
            .then(function (data) {
            _this.spinner.hide();
            _this.plan_gold_plan = data;
            _this.plan_firm_s = _this.plan_gold_plan.data[0];
            _this.plane_seleted = data['data'];
            console.log(_this.plane_seleted);
            _this.plan_gold_plan = new Array;
            _this.plan_gold_plan.push(_this.plan_firm_s);
            // this.plan_silver_plan=data;
            // this.plan_firm_t = this.plan_silver_plan.data[1]	
            // this.plan_silver_plan = new Array;
            // this.plan_silver_plan.push(this.plan_firm_t)
            // this.plan_Bronze_plan=data;
            // this.plan_firm_f = this.plan_Bronze_plan.data[0]	
            // this.plan_Bronze_plan = new Array;
            // this.plan_Bronze_plan.push(this.plan_firm_f)
            // this.plane_seleted = this.plan_Bronze_plan
        });
    };
    PlanPage.prototype.selected_plan = function (plan) {
        console.log(plan);
        // this.plane_seleted = plan
        this.plane_seleted = plan;
    };
    PlanPage.prototype.subscribe = function () {
        // this.storage.set('plane_seleted', this.plane_seleted);	
        this.storage.set('plane_seleted', this.plane_seleted);
        this.router.navigateByUrl("/pay-now");
    };
    PlanPage.prototype.skip_plan = function () {
        var _this = this;
        this.random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
        var plan_data = {
            apikey: this.gobalService.APIKey,
            user_id: this.user_id_get.user_id,
            plan_name: 'skip_plan',
            plan_id: '23',
            validity: '7',
            price: '0',
            transaction_no: 'skip',
            pay_pal_token: this.random,
            payment_status: '1',
        };
        this.gobalService.plan_activate(plan_data).then(function (data) {
            if (data['Status'] = '0') {
                var loginData = {
                    username: _this.user_login.email,
                    password: _this.user_login.password,
                };
                _this.spinner.show();
                _this.gobalService.login_user(loginData)
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
                                localStorage.setItem('details_user', JSON.stringify(this.userRep['data']));
                                if (!(this.userRep['data'][0].user_type == '2')) return [3 /*break*/, 1];
                                this.events.publish('open_app', 'lawyer');
                                this.events.publish('userName', this.userRep['data']);
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
    };
    PlanPage.prototype.chek_skip_plan = function () {
        var _this = this;
        var plan_data = {
            apikey: this.gobalService.APIKey,
            user_id: this.user_id_get.user_id,
            plan_id: '23',
        };
        this.gobalService.check_basic(plan_data)
            .then(function (data) {
            if (data['ErrorCode'] == 0) {
                _this.button_skip_plan = true;
            }
            else {
                _this.button_skip_plan = false;
            }
        });
    };
    PlanPage = tslib_1.__decorate([
        Component({
            selector: 'app-plan',
            templateUrl: './plan.page.html',
            styleUrls: ['./plan.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            GlobalService,
            NgxSpinnerService,
            Router,
            ToastController,
            Storage,
            Platform,
            Events])
    ], PlanPage);
    return PlanPage;
}());
export { PlanPage };
//# sourceMappingURL=plan.page.js.map