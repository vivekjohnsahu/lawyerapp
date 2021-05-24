import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController, Events } from '@ionic/angular';
var FirmDetailsPage = /** @class */ (function () {
    function FirmDetailsPage(router, routers, globalService, spinner, alertCtrl, events) {
        this.router = router;
        this.routers = routers;
        this.globalService = globalService;
        this.spinner = spinner;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.lawyer_not_found_vl = 2;
        this.lawyer_list_length = 1;
        this.view_law = true;
        this.lawyer_limit = 4;
        this.param = this.routers.snapshot.params["id"];
    }
    FirmDetailsPage.prototype.ngOnInit = function () {
        $(document).on("click", ".view_more > button", function () {
            $(".lawyer_head").toggleClass("lawyer_head_all");
        });
        this.parsn_lawyer();
    };
    FirmDetailsPage.prototype.more = function () {
        var element = document.getElementById("hidden_para");
        element.style.display = "block";
        var anchor = document.getElementById("more");
        anchor.style.display = "none";
    };
    FirmDetailsPage.prototype.less = function () {
        var element = document.getElementById("hidden_para");
        element.style.display = "none";
        var anchor = document.getElementById("more");
        anchor.style.display = "inline-block";
    };
    FirmDetailsPage.prototype.lawyer_detail = function (id) {
        this.events.publish('lawyer_edit', 'enquiry');
        this.router.navigateByUrl('/lawyer-detail' + '/' + id);
    };
    //view all lawyers
    FirmDetailsPage.prototype.viewAll = function () {
        if (this.lawyer_limit == this.lawyer_list.length) {
            this.lawyer_limit = 4;
        }
        else {
            this.lawyer_limit = this.lawyer_list.length;
        }
    };
    //personal detail lawyer start
    FirmDetailsPage.prototype.parsn_lawyer = function () {
        var _this = this;
        this.spinner.show();
        var data = {
            "apikey": this.globalService.APIKey,
            "id": this.param
        };
        this.globalService.personal_detail(data)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _status, lawyer_details_data, lawfirm_id, alert_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _status = data['ErrorCode'];
                        this.spinner.hide();
                        if (!(_status == '0')) return [3 /*break*/, 1];
                        this.lawyer_details = data;
                        lawyer_details_data = this.lawyer_details.data;
                        this.lawyer_details = new Array;
                        this.lawyer_details.push(lawyer_details_data);
                        this.lawyer_skill_show = this.lawyer_details[0].lawyer_skill.split(',');
                        lawfirm_id = {
                            "apikey": this.globalService.APIKey,
                            "lawfirm_id": this.param
                        };
                        this.globalService.firm_lawyer(lawfirm_id)
                            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                            var lawyer_list_data;
                            var _this = this;
                            return tslib_1.__generator(this, function (_a) {
                                this.lawyer_list = data;
                                if (this.lawyer_list.data.length > 3) {
                                    this.lawyer_list_length = 2;
                                }
                                this.lawyer_not_found = data['data'];
                                lawyer_list_data = this.lawyer_list.data;
                                this.lawyer_list = new Array;
                                this.lawyer_list.push(lawyer_list_data);
                                this.lawyer_list = this.lawyer_list[0];
                                if (this.lawyer_not_found == false || this.lawyer_not_found == undefined || this.lawyer_not_found == null || this.lawyer_not_found == '') {
                                    setTimeout(function () {
                                        _this.lawyer_not_found_vl = 1;
                                    }, 500);
                                }
                                return [2 /*return*/];
                            });
                        }); });
                        return [3 /*break*/, 4];
                    case 1: return [4 /*yield*/, this.alertCtrl.create({
                            message: 'Lawyer details is blank.',
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
    FirmDetailsPage = tslib_1.__decorate([
        Component({
            selector: 'app-firm-details',
            templateUrl: './firm-details.page.html',
            styleUrls: ['./firm-details.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            GlobalService,
            NgxSpinnerService,
            AlertController,
            Events])
    ], FirmDetailsPage);
    return FirmDetailsPage;
}());
export { FirmDetailsPage };
//# sourceMappingURL=firm-details.page.js.map