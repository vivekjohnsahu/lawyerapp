import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertController, Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var ProfileUserEditPage = /** @class */ (function () {
    function ProfileUserEditPage(alertController, toastController, routers, globalService, spinner, alertCtrl, events, storage, router) {
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
    ProfileUserEditPage.prototype.ngOnInit = function () {
        this.lawyer();
    };
    ProfileUserEditPage.prototype.ionViewWillEnter = function () {
        this.lawyer();
    };
    ProfileUserEditPage.prototype.lawyer = function () {
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
    ProfileUserEditPage.prototype.user_edit = function () {
        localStorage.setItem('lawyer_all_data', JSON.stringify(this.lawyer_all_data));
        this.events.publish('lawyer_edit', '');
        this.router.navigateByUrl('/manage-lawyer');
    };
    ProfileUserEditPage.prototype.user_click = function () {
        this.router.navigateByUrl('/my-profile');
    };
    ProfileUserEditPage = tslib_1.__decorate([
        Component({
            selector: 'app-profile-user-edit',
            templateUrl: './profile-user-edit.page.html',
            styleUrls: ['./profile-user-edit.page.scss'],
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
    ], ProfileUserEditPage);
    return ProfileUserEditPage;
}());
export { ProfileUserEditPage };
//# sourceMappingURL=profile-user-edit.page.js.map