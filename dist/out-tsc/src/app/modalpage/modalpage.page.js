import * as tslib_1 from "tslib";
import { Component, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../globalServices/global.service';
import { Router } from '@angular/router';
import { MenuController, AlertController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NgxSpinnerService } from 'ngx-spinner';
var ModalpagePage = /** @class */ (function () {
    function ModalpagePage(modalController, globalService, router, menu, alertController, navController, storage, zone, spinner) {
        this.modalController = modalController;
        this.globalService = globalService;
        this.router = router;
        this.menu = menu;
        this.alertController = alertController;
        this.navController = navController;
        this.storage = storage;
        this.zone = zone;
        this.spinner = spinner;
        this.lawyerAdd = {
            lawyerType: "",
            location: "",
        };
        //  validation pattern start
        this.lowyerChek = new FormGroup({
            lawyerType: new FormControl('', [Validators.required]),
            location: new FormControl('', [Validators.required]),
        });
        //  validation pattern end
        // auto place 
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }
    ModalpagePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var apikey = {
            "apikey": this.globalService.APIKey
        };
        this.globalService.search_skill(apikey)
            .then(function (data) {
            _this.skills_view = data;
            _this.skills = _this.skills_view.data;
        });
    };
    // loacation autocomplete search 
    ModalpagePage.prototype.updateSearchResults = function () {
        var _this = this;
        if (this.lawyerAdd.location == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.lawyerAdd.location }, function (predictions, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.autocompleteItems = [];
                _this.zone.run(function () {
                    predictions.forEach(function (prediction) {
                        _this.autocompleteItems.push(prediction);
                    });
                });
            }
            else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
                setTimeout(function () {
                    _this.updateSearchResults();
                }, 200);
            }
        });
    };
    //select location
    ModalpagePage.prototype.selectSearchResult = function (item) {
        this.autocompleteItems = [];
        this.lawyerAdd.location = item.description;
        var split_locaton = this.lawyerAdd.location.split(',');
        this.lawyerAdd.location = split_locaton[0];
    };
    ModalpagePage.prototype.dismiss = function () {
        this.modalController.dismiss();
    };
    // lowyer search function start
    ModalpagePage.prototype.lawyerbtn = function () {
        var _this = this;
        this.spinner.show();
        var key = {
            'apikey': this.globalService.APIKey,
            'skill': this.lawyerAdd.lawyerType,
            'location': this.lawyerAdd.location
        };
        this.globalService.userFilter(key)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var alert_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._status = data['ErrorCode'];
                        this.Message = data['message'];
                        this.spinner.hide();
                        if (!(this._status == '0')) return [3 /*break*/, 4];
                        this.filter_user = data;
                        if (!(this.filter_user.data == false)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: this.lawyerAdd.location + ' location not found lawyer',
                                buttons: [{ text: 'Ok' }]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        localStorage.setItem('FilterData', JSON.stringify(this.filter_user));
                        this.router.navigateByUrl('/home');
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    ModalpagePage = tslib_1.__decorate([
        Component({
            selector: 'app-modalpage',
            templateUrl: './modalpage.page.html',
            styleUrls: ['./modalpage.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ModalController,
            GlobalService,
            Router,
            MenuController,
            AlertController,
            NavController,
            Storage,
            NgZone,
            NgxSpinnerService])
    ], ModalpagePage);
    return ModalpagePage;
}());
export { ModalpagePage };
//# sourceMappingURL=modalpage.page.js.map