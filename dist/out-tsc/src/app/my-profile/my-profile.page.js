import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController } from '@ionic/angular';
import { Events } from '@ionic/angular';
var MyProfilePage = /** @class */ (function () {
    function MyProfilePage(router, routers, globalService, spinner, alertCtrl, events) {
        this.router = router;
        this.routers = routers;
        this.globalService = globalService;
        this.spinner = spinner;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.lawyer_not_found_vl = 2;
    }
    MyProfilePage.prototype.ngOnInit = function () {
        $(".view_more > button").click(function () {
            $(".hidden_lawyer").slideToggle(300);
            $(this).toggleClass("view_less");
        });
        this.parsn_lawyer();
    };
    MyProfilePage.prototype.ionViewWillEnter = function () {
        this.parsn_lawyer();
    };
    MyProfilePage.prototype.more = function () {
        var element = document.getElementById("hidden_para");
        element.style.display = "block";
        var anchor = document.getElementById("more");
        anchor.style.display = "none";
    };
    MyProfilePage.prototype.less = function () {
        var element = document.getElementById("hidden_para");
        element.style.display = "none";
        var anchor = document.getElementById("more");
        anchor.style.display = "inline-block";
    };
    MyProfilePage.prototype.lawyer_detail = function (id) {
        this.events.publish('lawyer_edit', 'edit');
        this.router.navigateByUrl('/profile-user-edit' + '/' + id);
    };
    //   personal detail lawyer start
    MyProfilePage.prototype.parsn_lawyer = function () {
        var _this = this;
        this.spinner.show();
        var user = JSON.parse(localStorage.getItem('details_user'));
        var data = {
            "apikey": this.globalService.APIKey,
            "lawfirm_id": user[0].id
        };
        this.globalService.my_profile(data)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _status, lawyer_details_data;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                _status = data['ErrorCode'];
                this.spinner.hide();
                if (_status == '0') {
                    this.lawyer_details = data;
                    lawyer_details_data = this.lawyer_details.data.lawfirm_profile;
                    this.lawyer_details = new Array;
                    this.lawyer_details.push(lawyer_details_data);
                    this.lawyer_skill_show = this.lawyer_details[0].lawyer_skill.split(',');
                    this.lawyer_list_data = data;
                    this.lawyer_list_data = this.lawyer_list_data.data.lawyer_list;
                    this.lawyer_description = lawyer_details_data.description;
                    this.lawyer_list = new Array;
                    this.lawyer_list.push(this.lawyer_list_data);
                    this.lawyer_list = this.lawyer_list[0];
                    this.lawyer_not_found = this.lawyer_list_data;
                    this.lawyer_all_data = this.lawyer_not_found;
                    if (this.lawyer_not_found == false || this.lawyer_not_found == undefined || this.lawyer_not_found == null || this.lawyer_not_found == '') {
                        setTimeout(function () {
                            _this.lawyer_not_found_vl = 1;
                        }, 500);
                    }
                }
                return [2 /*return*/];
            });
        }); });
    };
    MyProfilePage.prototype.user_edit = function () {
        this.router.navigateByUrl("/manage-lawyer");
    };
    MyProfilePage = tslib_1.__decorate([
        Component({
            selector: 'app-my-profile',
            templateUrl: './my-profile.page.html',
            styleUrls: ['./my-profile.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            ActivatedRoute,
            GlobalService,
            NgxSpinnerService,
            AlertController,
            Events])
    ], MyProfilePage);
    return MyProfilePage;
}());
export { MyProfilePage };
//# sourceMappingURL=my-profile.page.js.map