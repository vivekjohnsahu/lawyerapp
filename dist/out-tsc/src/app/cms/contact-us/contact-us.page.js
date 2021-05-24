import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, Platform } from '@ionic/angular';
import { GlobalService } from '../../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastController } from '@ionic/angular';
var ContactUsPage = /** @class */ (function () {
    function ContactUsPage(alertController, spinner, globalService, toastController, plt) {
        this.alertController = alertController;
        this.spinner = spinner;
        this.globalService = globalService;
        this.toastController = toastController;
        this.plt = plt;
        this.contact = {
            firstName: "",
            email: "",
            number: "",
            msg: ""
        };
        this.regExEmail = "^([a-zA-Z0-9_.]+@[a-zA-Z0-9]+[.][.a-zA-Z]+)$";
        //  validation pattern start
        var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.contactData = new FormGroup({
            firstName: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),
            number: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
            msg: new FormControl('', [Validators.required]),
        });
    }
    ContactUsPage.prototype.ngOnInit = function () { };
    ContactUsPage.prototype.contact_us = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast, contact_us;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.contact.email.match(this.regExEmail)) return [3 /*break*/, 2];
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
                        contact_us = {
                            "firstName": this.contact.firstName,
                            "email": this.contact.email,
                            "msg": this.contact.msg,
                            "number": this.contact.number,
                            "apikey": this.globalService.APIKey,
                        };
                        this.globalService.contact_us_user(contact_us)
                            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var toast, alert_1;
                            return tslib_1.__generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        this._status = data['ErrorCode'];
                                        this.message = data['message'];
                                        this.spinner.hide();
                                        if (!(this._status == '0')) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.toastController.create({
                                                message: 'successfully sent your query',
                                                position: 'bottom',
                                                color: "success",
                                                duration: 3000
                                            })];
                                    case 1:
                                        toast = _a.sent();
                                        this.contactData.reset();
                                        toast.present();
                                        return [3 /*break*/, 5];
                                    case 2:
                                        if (!(this._status == '1')) return [3 /*break*/, 5];
                                        return [4 /*yield*/, this.alertController.create({
                                                message: 'Do not sent your msg',
                                                buttons: ['OK']
                                            })];
                                    case 3:
                                        alert_1 = _a.sent();
                                        return [4 /*yield*/, alert_1.present()];
                                    case 4:
                                        _a.sent();
                                        _a.label = 5;
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // number Accept only start
    ContactUsPage.prototype.numberAccept = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    ContactUsPage = tslib_1.__decorate([
        Component({
            selector: 'app-contact-us',
            templateUrl: './contact-us.page.html',
            styleUrls: ['./contact-us.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [AlertController,
            NgxSpinnerService,
            GlobalService,
            ToastController,
            Platform])
    ], ContactUsPage);
    return ContactUsPage;
}());
export { ContactUsPage };
//# sourceMappingURL=contact-us.page.js.map