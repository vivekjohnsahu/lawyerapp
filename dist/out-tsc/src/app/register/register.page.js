import * as tslib_1 from "tslib";
import { Component, ViewChild, NgZone } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera } from '@ionic-native/camera/ngx';
import { ToastController, AlertController, ActionSheetController, MenuController, IonSlides } from '@ionic/angular';
import { GlobalService } from '../../globalServices/global.service';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxSpinnerService } from 'ngx-spinner';
import { Storage } from '@ionic/storage';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(router, camera, actionSheetController, alertController, gobalService, menu, splashScreen, statusBar, spinner, storage, zone, toastController) {
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
        this.toastController = toastController;
        this.ImageBind = 'https://www.w3schools.com/howto/img_avatar.png';
        this.ImageBind_dataBase = '';
        this.cityOpt = [
            "INDIA",
            "UAE",
        ];
        this.userData = {
            apikey: "",
            law_firm_name: "",
            email: "",
            mobile: "",
            // establishment_date:"",
            country: "",
            practice_area: "",
            address: "",
            location: "",
            description: "",
            password: "",
            profile_image: "",
        };
        //  validation pattern start
        var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.signupUser = new FormGroup({
            law_firm_name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),
            mobile: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
            // establishment_date: new FormControl('', [Validators.required]),
            country: new FormControl('', [Validators.required]),
            location: new FormControl('', [Validators.required]),
            practice_area: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
            description: new FormControl(),
        });
        if (this.router.url == "/register") {
            this.menu.enable(false);
        }
        // auto place 
        this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
        this.autocomplete = { input: '' };
        this.autocompleteItems = [];
    }
    RegisterPage.prototype.ngOnInit = function () {
        this.menu.enable(false);
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#233658;');
        this.practice_area();
    };
    // loacation autocomplete search 
    RegisterPage.prototype.updateSearchResults = function () {
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
    RegisterPage.prototype.selectSearchResult = function (item) {
        this.autocompleteItems = [];
        this.userData.location = item.description;
    };
    // manu bar hide
    RegisterPage.prototype.ionViewWillEnter = function () {
        this.menu.enable(false);
    };
    // manu bar show leave page
    RegisterPage.prototype.ionViewDidLeave = function () {
        this.menu.enable(false);
    };
    // image popup start
    RegisterPage.prototype.SelectPhoto = function () {
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
    RegisterPage.prototype.takePhoto = function (sourceType) {
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
    RegisterPage.prototype.signUp = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var user_practice_area;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                user_practice_area = this.userData.practice_area;
                this.userData = {
                    "apikey": this.gobalService.APIKey,
                    "law_firm_name": this.userData.law_firm_name,
                    "email": this.userData.email,
                    "mobile": this.userData.mobile,
                    // "establishment_date": this.userData.establishment_date,
                    "country": this.userData.country,
                    "location": this.userData.location,
                    "practice_area": this.userData.practice_area,
                    "address": this.userData.address,
                    "profile_image": this.ImageBind_dataBase,
                    "password": this.userData.password,
                    "description": this.userData.description,
                };
                this.spinner.show();
                this.gobalService.register_lawyer(this.userData)
                    .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                    var toast, alert_1, alert_2;
                    return tslib_1.__generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this._status = data['ErrorCode'];
                                this.Message = data['message'];
                                this.spinner.hide();
                                if (!(this._status == '0')) return [3 /*break*/, 2];
                                this.storage.set('otp_type', '2');
                                this.storage.set('email', this.userData.email);
                                this.router.navigateByUrl('/verify-otp');
                                return [4 /*yield*/, this.toastController.create({
                                        message: 'sent otp your register email id.',
                                        position: 'top',
                                        color: "dark",
                                        duration: 3000
                                    })];
                            case 1:
                                toast = _a.sent();
                                toast.present();
                                this.ImageBind_dataBase = '';
                                this.ImageBind = '';
                                this.signupUser.reset();
                                return [3 /*break*/, 8];
                            case 2:
                                if (!(this._status == '1')) return [3 /*break*/, 5];
                                return [4 /*yield*/, this.alertController.create({
                                        message: this.Message,
                                        buttons: [{ text: 'Ok', }]
                                    })];
                            case 3:
                                alert_1 = _a.sent();
                                return [4 /*yield*/, alert_1.present()];
                            case 4:
                                _a.sent();
                                return [3 /*break*/, 8];
                            case 5: return [4 /*yield*/, this.alertController.create({
                                    message: 'You have not registered try again.',
                                    buttons: [{ text: 'Close' }]
                                })];
                            case 6:
                                alert_2 = _a.sent();
                                return [4 /*yield*/, alert_2.present()];
                            case 7:
                                _a.sent();
                                _a.label = 8;
                            case 8: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    //  signUp function end
    RegisterPage.prototype.numberAccept = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    RegisterPage.prototype.practice_area = function () {
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
    tslib_1.__decorate([
        ViewChild('slides'),
        tslib_1.__metadata("design:type", IonSlides)
    ], RegisterPage.prototype, "slides", void 0);
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
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
            ToastController])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map