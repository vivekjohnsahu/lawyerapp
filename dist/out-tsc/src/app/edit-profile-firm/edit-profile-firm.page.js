import * as tslib_1 from "tslib";
import { Component, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { AlertController, ActionSheetController, MenuController, IonSlides } from '@ionic/angular';
import { GlobalService } from '../../globalServices/global.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';
var EditProfileFirmPage = /** @class */ (function () {
    function EditProfileFirmPage(router, camera, actionSheetController, alertController, gobalService, menu, splashScreen, statusBar, spinner, storage, zone, events) {
        this.router = router;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.gobalService = gobalService;
        this.menu = menu;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.spinner = spinner;
        this.storage = storage;
        this.zone = zone;
        this.events = events;
        this.ImageBind = 'https://www.w3schools.com/howto/img_avatar.png';
        this.ImageBind_dataBase = '';
        this.cityOpt = [
            "INDIA",
            "UAE",
        ];
        this.userData = {
            apikey: "",
            law_firm_name: "",
            mobile: "",
            // establishment_date:"",
            country: "",
            practice_area: "",
            address: "",
            location: "",
            description: "",
            profile_image: "",
            id: ''
        };
        this.arr = [];
        //  validation pattern start
        this.signupUser = new FormGroup({
            law_firm_name: new FormControl('', [Validators.required]),
            mobile: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
            // establishment_date: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            location: new FormControl('', [Validators.required]),
            practice_area: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            description: new FormControl(),
        });
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }
    EditProfileFirmPage.prototype.ngOnInit = function () {
        this.menu.enable(false);
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
        this.parsn_lawyer();
        this.practice_area();
    };
    // loacation autocomplete search 
    EditProfileFirmPage.prototype.updateSearchResults = function () {
        var _this = this;
        if (this.userData.location == '') {
            this.autocompleteItems = [];
            return;
        }
        this.GoogleAutocomplete.getPlacePredictions({ input: this.userData.location }, function (predictions, status) {
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
    EditProfileFirmPage.prototype.selectSearchResult = function (item) {
        this.autocompleteItems = [];
        this.userData.location = item.description;
    };
    // manu bar hide
    EditProfileFirmPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    // manu bar show leave page
    EditProfileFirmPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    // image popup start
    EditProfileFirmPage.prototype.SelectPhoto = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            buttons: [{
                                    text: 'Camera',
                                    icon: 'Camera',
                                    handler: function () {
                                        _this.takePhoto(1);
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'images',
                                    handler: function () {
                                        _this.takePhoto(2);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    //  get image path start
    EditProfileFirmPage.prototype.takePhoto = function (sourceType) {
        var _this = this;
        var options = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            sourceType: sourceType == 1 ? this.camera.PictureSourceType.CAMERA : this.camera.PictureSourceType.PHOTOLIBRARY,
        };
        this.camera.getPicture(options).then(function (imgData) {
            _this.ImageBind = "data:image/jpg;base64," + imgData;
            _this.ImageBind_dataBase = imgData;
        });
    };
    //  signUp function start
    EditProfileFirmPage.prototype.signUp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                user = JSON.parse(localStorage.getItem('details_user'));
                this.userData = {
                    "apikey": this.gobalService.APIKey,
                    "law_firm_name": this.userData.law_firm_name,
                    "mobile": this.userData.mobile,
                    // "establishment_date": this.userData.establishment_date,
                    "country": this.userData.country,
                    "location": this.userData.location,
                    "practice_area": this.userData.practice_area,
                    "address": this.userData.address,
                    "profile_image": this.ImageBind_dataBase,
                    "description": this.userData.description,
                    "id": user[0].id
                };
                this.spinner.show();
                this.gobalService.lawyer_firm_edit(this.userData)
                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var alert_1, alert_2, alert_3;
                    var _this = this;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.userRep = data;
                                this._status = data['ErrorCode'];
                                this.Message = data['message'];
                                this.spinner.hide();
                                if (!(this._status == '0')) return [3 /*break*/, 3];
                                return [4 /*yield*/, this.alertController.create({
                                        message: this.Message,
                                        buttons: [{
                                                text: 'Ok',
                                                handler: function () {
                                                    var abc = {
                                                        0: _this.userRep.data
                                                    };
                                                    localStorage.setItem('details_user', JSON.stringify(abc));
                                                    _this.events.publish('userName', abc);
                                                    _this.router.navigateByUrl('/my-profile');
                                                    _this.ImageBind_dataBase = '';
                                                    _this.ImageBind = '';
                                                    _this.signupUser.reset();
                                                }
                                            }]
                                    })];
                            case 1:
                                alert_1 = _a.sent();
                                return [4 /*yield*/, alert_1.present()];
                            case 2:
                                _a.sent();
                                return [3 /*break*/, 9];
                            case 3:
                                if (!(this._status == '1')) return [3 /*break*/, 6];
                                return [4 /*yield*/, this.alertController.create({
                                        message: this.Message,
                                        buttons: [{ text: 'Ok', }]
                                    })];
                            case 4:
                                alert_2 = _a.sent();
                                return [4 /*yield*/, alert_2.present()];
                            case 5:
                                _a.sent();
                                return [3 /*break*/, 9];
                            case 6: return [4 /*yield*/, this.alertController.create({
                                    message: 'You have not edit your profile try again.',
                                    buttons: [{ text: 'Close' }]
                                })];
                            case 7:
                                alert_3 = _a.sent();
                                return [4 /*yield*/, alert_3.present()];
                            case 8:
                                _a.sent();
                                _a.label = 9;
                            case 9: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    //  signUp function end
    EditProfileFirmPage.prototype.numberAccept = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    EditProfileFirmPage.prototype.practice_area = function () {
        var _this = this;
        var apikey = {
            "apikey": this.gobalService.APIKey
        };
        this.gobalService.practice(apikey).
            then(function (data) {
            _this.practiceOpt = new Array;
            _this.practiceOpt.push(data);
            _this.practiceOpt = _this.practiceOpt[0].data;
        });
    };
    EditProfileFirmPage.prototype.parsn_lawyer = function () {
        var _this = this;
        this.spinner.show();
        var user = JSON.parse(localStorage.getItem('details_user'));
        var data = {
            "apikey": this.gobalService.APIKey,
            "lawfirm_id": user[0].id
        };
        this.gobalService.my_profile(data)
            .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _status, i;
            return tslib_1.__generator(this, function (_a) {
                _status = data['ErrorCode'];
                this.spinner.hide();
                if (_status == '0') {
                    this.lawyer_firm_details = data;
                    this.alladata = data;
                    this.lawyer_firm_details = this.lawyer_firm_details.data.lawfirm_profile;
                    this.userData = this.lawyer_firm_details;
                    this.userData.law_firm_name = this.lawyer_firm_details.company_name;
                    this.userData.mobile = this.lawyer_firm_details.contact_number;
                    this.ImageBind = this.lawyer_firm_details.profile_image;
                    this.ImageBind_dataBase = '';
                    for (i = 0; this.alladata.data.lawfirm_profile.practice_area.length > i; i++) {
                        this.arr.push(this.alladata.data.lawfirm_profile.practice_area[i].id);
                        this.arr = this.arr;
                    }
                    this.userData.practice_area = this.arr;
                }
                return [2 /*return*/];
            });
        }); });
    };
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], EditProfileFirmPage.prototype, "slides", void 0);
    EditProfileFirmPage = tslib_1.__decorate([
        Component({
            selector: 'app-edit-profile-firm',
            templateUrl: './edit-profile-firm.page.html',
            styleUrls: ['./edit-profile-firm.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            Camera,
            ActionSheetController,
            AlertController,
            GlobalService,
            MenuController,
            SplashScreen,
            StatusBar,
            NgxSpinnerService,
            Storage,
            NgZone,
            Events])
    ], EditProfileFirmPage);
    return EditProfileFirmPage;
}());
export { EditProfileFirmPage };
//# sourceMappingURL=edit-profile-firm.page.js.map