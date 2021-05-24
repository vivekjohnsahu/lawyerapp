import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var LawyerDetailPage = /** @class */ (function () {
    function LawyerDetailPage(alertController, toastController, routers, globalService, spinner, alertCtrl, events, storage, router) {
        this.alertController = alertController;
        this.toastController = toastController;
        this.routers = routers;
        this.globalService = globalService;
        this.spinner = spinner;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.storage = storage;
        this.router = router;
        this.page_hide = false;
        this.param = this.routers.snapshot.params["id"];
    }
    LawyerDetailPage.prototype.ngOnInit = function () {
        this.lawyer();
    };
    LawyerDetailPage.prototype.user_enquiry = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Remarks!',
                            inputs: [{
                                    name: 'user_enq',
                                    type: 'text',
                                    placeholder: 'remarks'
                                },],
                            buttons: [{
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                }, {
                                    text: 'Ok',
                                    handler: function (user_remaek) {
                                        _this.userremarkValue(user_remaek);
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
    LawyerDetailPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.events.subscribe('open_app', function (data) {
            _this.open_app = data;
            _this.storage.set('open_app', data);
        });
        this.storage.get('open_app').then(function (val) {
            _this.open_app = val;
        });
    };
    LawyerDetailPage.prototype.lawyer = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            "apikey": this.globalService.APIKey,
            "lawyer_id": this.param
        };
        this.globalService.lawyer_profile(data)
            .then(function (data) {
            _this.page_hide = true;
            _this.spinner.hide();
            _this.lawyer_all_data = data['data'];
            _this.lawyer_profile = data;
            console.log(_this.lawyer_all_data);
            _this.profile_image = _this.lawyer_profile.data[0].lawyer_image;
            _this.first_name = _this.lawyer_profile.data[0].first_name;
            _this.last_name = _this.lawyer_profile.data[0].last_name;
            _this.lawyer_skill = _this.lawyer_profile.data[0].add_skills;
            _this.lawyer_skill_show = _this.lawyer_skill.split(',');
            _this.email = _this.lawyer_profile.data[0].email;
            _this.contact_number1 = _this.lawyer_profile.data[0].contact_number;
            _this.address_line1 = _this.lawyer_profile.data[0].address;
        });
    };
    LawyerDetailPage.prototype.userremarkValue = function (user_remaek) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user, lawyer_prnl, toast;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user = JSON.parse(localStorage.getItem('details_user'));
                        this.fnlName = user[0].first_name + ' ' + user[0].last_name;
                        this.text_user = user_remaek.user_enq;
                        lawyer_prnl = {
                            "apikey": this.globalService.APIKey,
                            "remarks": this.text_user,
                            "name": this.fnlName,
                            "lawfirm": this.lawyer_all_data[0].lawfirm_id,
                            "email": user[0].email,
                            "lawyer_name": this.first_name + " " + this.last_name
                        };
                        if (!(user_remaek.user_enq == "")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.toastController.create({
                                message: 'cannot be blank remarks',
                                color: "dark",
                                position: 'bottom',
                                duration: 2000
                            })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [3 /*break*/, 3];
                    case 2:
                        this.globalService.enquiry(lawyer_prnl)
                            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var toast, toast;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this._status = data['ErrorCode'];
                                        this.Message = data['message'];
                                        this.spinner.hide();
                                        if (!(this._status == '0')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.toastController.create({
                                                message: 'Submit your enquiry.',
                                                position: 'bottom',
                                                color: "success",
                                                duration: 3000
                                            })];
                                    case 1:
                                        toast = _a.sent();
                                        toast.present();
                                        return [3 /*break*/, 4];
                                    case 2:
                                        if (!(this._status == '1')) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.toastController.create({
                                                message: 'You have not submit your enquiry.',
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
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LawyerDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-lawyer-detail',
            templateUrl: './lawyer-detail.page.html',
            styleUrls: ['./lawyer-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            ToastController,
            ActivatedRoute,
            GlobalService,
            NgxSpinnerService,
            AlertController,
            Events,
            Storage,
            Router])
    ], LawyerDetailPage);
    return LawyerDetailPage;
}());
export { LawyerDetailPage };
//# sourceMappingURL=lawyer-detail.page.js.map