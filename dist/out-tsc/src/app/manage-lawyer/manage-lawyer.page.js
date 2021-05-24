import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { NavController, AlertController, ActionSheetController, ToastController, Platform } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
var ManageLawyerPage = /** @class */ (function () {
    function ManageLawyerPage(navCtrl, camera, actionSheetController, alertController, gobalService, spinner, router, toastController, events, storage, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.camera = camera;
        this.actionSheetController = actionSheetController;
        this.alertController = alertController;
        this.gobalService = gobalService;
        this.spinner = spinner;
        this.router = router;
        this.toastController = toastController;
        this.events = events;
        this.storage = storage;
        this.platform = platform;
        this.step_contant_1 = true;
        this.fill_step_ = 0;
        this.ImageBind = 'https://www.w3schools.com/howto/img_avatar.png';
        this.ImageData = '';
        this.skill_add = [];
        this.LawyerData = {
            firstname: "",
            lastname: "",
            email: "",
            number: "",
            date: "",
        };
        this.LawyerLocation = {
            address: "",
            city: "",
        };
        this.pass_skill = [];
        this.list_show = false;
        this.no_data = 1;
        this.lawyer_skill_remove = 0;
        //  validation pattern start
        var email_pattern = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        this.manageLawyer = new FormGroup({
            firstname: new FormControl('', [Validators.required]),
            lastname: new FormControl(),
            email: new FormControl('', [Validators.required, Validators.pattern(email_pattern)]),
            number: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]),
            date: new FormControl('', [Validators.required]),
        });
        this.LawyerAddress = new FormGroup({
            address: new FormControl('', [Validators.required]),
            city: new FormControl('', [Validators.required]),
        });
        this.platform.backButton.subscribe(function () {
            _this.presentConfirm();
        });
    }
    ManageLawyerPage.prototype.ionViewWillEnter = function () {
        this.step_contant_1 = true;
        this.step_contant_2 = false;
        this.step_contant_3 = false;
    };
    ManageLawyerPage.prototype.ngOnInit = function () {
        var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
        if (lawyer_all_data != '' && lawyer_all_data != undefined && lawyer_all_data != null) {
            this.LawyerData = {
                firstname: lawyer_all_data[0].first_name,
                lastname: lawyer_all_data[0].last_name,
                email: lawyer_all_data[0].email,
                number: lawyer_all_data[0].contact_number,
                date: lawyer_all_data[0].dob,
            };
            this.LawyerLocation = {
                address: lawyer_all_data[0].address,
                city: lawyer_all_data[0].location,
            };
            this.ImageBind = lawyer_all_data[0].lawyer_image;
            this.skill_add_edit = lawyer_all_data[0].add_skills;
            this.skill_add = this.skill_add_edit.split(',');
            this.pass_skill.push(lawyer_all_data[0].skill);
            this.selected_city = lawyer_all_data[0].location;
            this.getISkill();
        }
        else {
            this.selected_city = '';
            this.LawyerData = {
                firstname: "",
                lastname: "",
                email: "",
                number: "",
                date: "",
            };
            this.LawyerLocation = {
                address: "",
                city: "",
            };
            this.ImageBind = 'https://www.w3schools.com/howto/img_avatar.png';
            this.pass_skill = [];
            this.skill_add = [];
        }
    };
    // template html code start
    ManageLawyerPage.prototype.step_1 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lawyer_all_data, alert_1;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
                        if (!(lawyer_all_data == '' || lawyer_all_data == undefined || lawyer_all_data == null)) return [3 /*break*/, 4];
                        this.lawyer_skill_remove = 1;
                        if (!(this.step_contant_1 != true)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Conform back to first step',
                                buttons: [{
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                    },
                                    {
                                        text: 'ok',
                                        handler: function () {
                                            _this.step_contant_1 = true;
                                            _this.step_contant_2 = false;
                                            _this.step_contant_3 = false;
                                            _this.fill_step_ = 0;
                                        }
                                    }]
                            })];
                    case 1:
                        alert_1 = _a.sent();
                        return [4 /*yield*/, alert_1.present()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.step_contant_1 = true;
                        this.step_contant_2 = false;
                        this.step_contant_3 = false;
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ManageLawyerPage.prototype.step_2 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lawyer_all_data, alert_2, alert_3;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
                        if (!(lawyer_all_data == '' || lawyer_all_data == undefined || lawyer_all_data == null)) return [3 /*break*/, 7];
                        if (!(this.step_contant_2 != true)) return [3 /*break*/, 6];
                        if (!(this.fill_step_ == 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Fill the first step and move next step',
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_2 = _a.sent();
                        return [4 /*yield*/, alert_2.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(this.fill_step_ == 1 || this.fill_step_ == 2)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Conform back to second step',
                                buttons: [{
                                        text: 'Cancel',
                                        role: 'cancel',
                                        cssClass: 'secondary',
                                    },
                                    {
                                        text: 'ok',
                                        handler: function () {
                                            _this.step_contant_2 = true;
                                            _this.step_contant_1 = false;
                                            _this.step_contant_3 = false;
                                            _this.fill_step_ = 1;
                                        }
                                    }]
                            })];
                    case 4:
                        alert_3 = _a.sent();
                        return [4 /*yield*/, alert_3.present()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        this.step_contant_2 = true;
                        this.step_contant_1 = false;
                        this.step_contant_3 = false;
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    ManageLawyerPage.prototype.step_3 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lawyer_all_data, alert_4, alert_5, alert_6;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
                        if (!(lawyer_all_data == '' || lawyer_all_data == undefined || lawyer_all_data == null)) return [3 /*break*/, 10];
                        if (!(this.step_contant_3 != true)) return [3 /*break*/, 9];
                        if (!(this.fill_step_ == 2)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Fill the first step and move next step',
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_4 = _a.sent();
                        return [4 /*yield*/, alert_4.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 3:
                        if (!(this.fill_step_ == 1)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Fill the second step and move next step',
                                buttons: ['OK']
                            })];
                    case 4:
                        alert_5 = _a.sent();
                        return [4 /*yield*/, alert_5.present()];
                    case 5:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 6:
                        if (!(this.fill_step_ == 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Fill the first and second step and move third step',
                                buttons: ['OK']
                            })];
                    case 7:
                        alert_6 = _a.sent();
                        return [4 /*yield*/, alert_6.present()];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9: return [3 /*break*/, 11];
                    case 10:
                        this.step_contant_2 = false;
                        this.step_contant_1 = false;
                        this.step_contant_3 = true;
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    // template html code end
    // form validation start
    ManageLawyerPage.prototype.Lawyer_stap_1 = function () {
        var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
        if (lawyer_all_data == '' || lawyer_all_data == undefined || lawyer_all_data == null) {
            this.lawyer_skill_remove = 1;
        }
        this.step_contant_2 = true;
        this.step_contant_1 = false;
        this.step_contant_3 = false;
        this.fill_step_ = 1;
    };
    ManageLawyerPage.prototype.Lawyer_stap_2 = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var alert_7;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.skill_add.length == 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.alertController.create({
                                message: 'Add your skill',
                                buttons: ['OK']
                            })];
                    case 1:
                        alert_7 = _a.sent();
                        return [4 /*yield*/, alert_7.present()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        this.step_contant_3 = true;
                        this.step_contant_1 = false;
                        this.step_contant_2 = false;
                        this.fill_step_ = 2;
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ManageLawyerPage.prototype.Lawyer_stap_3 = function () {
        var _this = this;
        this.spinner.show();
        var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
        if (lawyer_all_data != '' && lawyer_all_data != undefined && lawyer_all_data != null) {
            var lawyer_info = {
                first_name: this.LawyerData.firstname,
                last_name: this.LawyerData.lastname,
                email: this.LawyerData.email,
                contact_number: this.LawyerData.number,
                dob: this.LawyerData.date,
                id: lawyer_all_data[0].id,
                lawyer_image: this.ImageData,
                apikey: this.gobalService.APIKey,
                skill: this.pass_skill,
                // skill:this.skill_add,
                address: this.LawyerLocation.address,
                location: this.LawyerLocation.city
            };
            this.gobalService.edit_lawyers(lawyer_info)
                .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var alert_8, alert_9, toast;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._status = data['ErrorCode'];
                            this.Message = data['message'];
                            this.spinner.hide();
                            if (!(this._status == '0')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.alertController.create({
                                    message: this.Message,
                                    buttons: [{
                                            text: 'Ok',
                                            handler: function () {
                                                _this.router.navigateByUrl('/profile-user-edit' + '/' + lawyer_all_data[0].id);
                                                localStorage.removeItem('lawyer_all_data');
                                                _this.manageLawyer.reset();
                                                _this.LawyerAddress.reset();
                                            }
                                        }]
                                })];
                        case 1:
                            alert_8 = _a.sent();
                            return [4 /*yield*/, alert_8.present()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 3:
                            if (!(this._status == '1')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.alertController.create({
                                    message: this.Message,
                                    buttons: [{
                                            text: 'Ok',
                                            handler: function () {
                                                _this.step_contant_1 = true;
                                                _this.step_contant_2 = false;
                                                _this.step_contant_3 = false;
                                                _this.fill_step_ = 0;
                                            }
                                        }]
                                })];
                        case 4:
                            alert_9 = _a.sent();
                            return [4 /*yield*/, alert_9.present()];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this.toastController.create({
                                message: this.Message,
                                position: 'bottom',
                                color: "dark",
                                duration: 3000
                            })];
                        case 7:
                            toast = _a.sent();
                            toast.present();
                            _a.label = 8;
                        case 8: return [2 /*return*/];
                    }
                });
            }); });
            localStorage.removeItem('lawyer_all_data');
        }
        else {
            var user = JSON.parse(localStorage.getItem('details_user'));
            var lawyer_info = {
                firstname: this.LawyerData.firstname,
                lastname: this.LawyerData.lastname,
                email: this.LawyerData.email,
                number: this.LawyerData.number,
                dob: this.LawyerData.date,
                lawfirm_id: user[0].id,
                lawyer_image: this.ImageData,
                apikey: this.gobalService.APIKey,
                skill: this.pass_skill,
                address: this.LawyerLocation.address,
                location: this.LawyerLocation.city
            };
            console.log(lawyer_info);
            this.gobalService.lawyer_add(lawyer_info)
                .then(function (data) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var alert_10, alert_11, alert_12, toast;
                var _this = this;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._status = data['ErrorCode'];
                            this.Message = data['message'];
                            this.spinner.hide();
                            if (!(this._status == '0')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.alertController.create({
                                    message: this.Message,
                                    buttons: [{
                                            text: 'Ok',
                                            handler: function () {
                                                // this.router.navigateByUrl('/my-profile')
                                                _this.router.navigateByUrl('/home');
                                                _this.manageLawyer.reset();
                                                _this.LawyerAddress.reset();
                                            }
                                        }]
                                })];
                        case 1:
                            alert_10 = _a.sent();
                            return [4 /*yield*/, alert_10.present()];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 3:
                            if (!(this._status == '2')) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.alertController.create({
                                    message: this.Message,
                                    buttons: ['Ok']
                                })];
                        case 4:
                            alert_11 = _a.sent();
                            return [4 /*yield*/, alert_11.present()];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 6:
                            if (!(this._status == '1')) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.alertController.create({
                                    message: this.Message,
                                    buttons: [{
                                            text: 'Ok',
                                            handler: function () {
                                                _this.step_contant_1 = true;
                                                _this.step_contant_2 = false;
                                                _this.step_contant_3 = false;
                                                _this.fill_step_ = 0;
                                            }
                                        }]
                                })];
                        case 7:
                            alert_12 = _a.sent();
                            return [4 /*yield*/, alert_12.present()];
                        case 8:
                            _a.sent();
                            return [3 /*break*/, 11];
                        case 9: return [4 /*yield*/, this.toastController.create({
                                message: this.Message,
                                position: 'bottom',
                                color: "dark",
                                duration: 3000
                            })];
                        case 10:
                            toast = _a.sent();
                            toast.present();
                            _a.label = 11;
                        case 11: return [2 /*return*/];
                    }
                });
            }); });
        }
    };
    // image popup start
    ManageLawyerPage.prototype.SelectPhoto = function () {
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
                                        var sourceType = 1;
                                        _this.takePhoto(1);
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'images',
                                    handler: function () {
                                        var sourceType = 2;
                                        _this.takePhoto(2);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                    }
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
    // //  get image path start
    ManageLawyerPage.prototype.takePhoto = function (sourceType) {
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
            _this.ImageData = imgData;
            _this.ImageBind = "data:image/jpg;base64," + imgData;
        });
    };
    // search and add skills start
    ManageLawyerPage.prototype.getISkill = function () {
        var _this = this;
        setTimeout(function () {
            _this.skill_key = _this.searchText;
            if (_this.skill_key.length > 0) {
                var key = {
                    apikey: _this.gobalService.APIKey,
                    key: _this.skill_key
                };
                _this.gobalService.search_skill(key)
                    .then(function (data) {
                    _this._status_skill = data['ErrorCode'];
                    if (_this._status_skill == 0) {
                        _this.no_data = 1;
                        _this.skills_view = data;
                        _this.skills = _this.skills_view.data;
                        _this.refreshSkills();
                    }
                    else {
                        // alert('1')
                        _this.no_data = 2;
                    }
                });
            }
        }, 500);
    };
    ManageLawyerPage.prototype.add_lawyer_skills = function (vl, i, id) {
        this.skill_add.push(vl);
        this.pass_skill.push(id);
        this.refreshSkills();
    };
    ManageLawyerPage.prototype.refreshSkills = function () {
        var _this = this;
        this.skill_add.map(function (val) {
            var skillObj = _this.skills.find(function (skill) {
                return skill.practice_area == val;
            });
            var index = _this.skills.indexOf(skillObj);
            if (index != -1) { // if added skill is in main skills array...
                _this.skills.splice(index, 1);
            }
        });
    };
    ManageLawyerPage.prototype.remove_skill = function (index, skillName) {
        var obj = {
            id: this.pass_skill[index],
            practice_area: skillName,
            status: "active"
        };
        console.log(skillName);
        console.log(obj);
        console.log(index);
        this.skills.push(obj);
        this.skill_add.splice(index, 1);
        this.pass_skill.splice(index, 1);
    };
    ManageLawyerPage.prototype.remove_all_skill = function () {
        this.skill_add = [];
        this.pass_skill = [];
        this.getISkill();
    };
    // number Accept only start
    ManageLawyerPage.prototype.numberAccept = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    };
    ManageLawyerPage.prototype.user_click = function () {
        var lawyer_all_data = JSON.parse(localStorage.getItem('lawyer_all_data'));
        if (lawyer_all_data != '' && lawyer_all_data != undefined && lawyer_all_data != null) {
            localStorage.removeItem('lawyer_all_data');
        }
    };
    ManageLawyerPage.prototype.presentConfirm = function () {
        this.user_click();
        this.router.navigateByUrl('/home');
    };
    ManageLawyerPage.prototype.focusFunction = function () {
        var _this = this;
        setTimeout(function () {
            _this.list_show = true;
        }, 300);
    };
    ManageLawyerPage = tslib_1.__decorate([
        Component({
            selector: 'app-manage-lawyer',
            templateUrl: './manage-lawyer.page.html',
            styleUrls: ['./manage-lawyer.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            Camera,
            ActionSheetController,
            AlertController,
            GlobalService,
            NgxSpinnerService,
            Router,
            ToastController,
            Events,
            Storage,
            Platform])
    ], ManageLawyerPage);
    return ManageLawyerPage;
}());
export { ManageLawyerPage };
//# sourceMappingURL=manage-lawyer.page.js.map