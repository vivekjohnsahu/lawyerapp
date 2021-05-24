import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
var GlobalService = /** @class */ (function () {
    function GlobalService(http) {
        this.http = http;
        this.BaseUrl = 'http://projects.tekshapers.in/lawyerapp/webservices/webapi/';
        this.APIKey = 'lawyer_L51r143567';
    }
    GlobalService.prototype.register_user = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'signup', JSON.stringify(data)).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Server Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.practice = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'get_practice_area', JSON.stringify(data)).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Server Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.login_user = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'front_login', JSON.stringify(data)).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.register_lawyer = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'lawfirm_signup', JSON.stringify(data)).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.email_verify_otp = function (data) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'verify_otp', JSON.stringify(data)).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.lawyer_firm_list = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'get_list_lawfirms', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error3");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.personal_detail = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'get_single_lawfirms', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.firm_lawyer = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'list_lawyers', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.enquiry = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'add_enquiry', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.lawyer_profile = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'single_lawyer', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.about_us = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'about_us', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.Term_condition = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'term_condition', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.forgot_password = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'forget_password', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.create_new_pass = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'change_password', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.search_skill = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'skill_list', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.lawyer_add = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'add_lawyers', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.get_enquiry = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'list_enquiry', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.single_enquiry = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'single_enquiry', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.change_pass = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'change_password_data', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.contact_us_user = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'contact_page_us', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.edit_lawyers = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'edit_lawyers', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.subscribe_chek = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'check_subscription_plan', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.plan = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'list_membership_plan', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.my_profile = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'lawfirm_profile', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.search = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'search_services', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.userFilter = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'get_list_lawfirms', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.lawyer_firm_edit = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'edit_lawfirm', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.user_profile = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'user_profile', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.user_profile_edit = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'edit_user', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.plan_activate = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'add_suscription_plan', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.get_notification = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'get_user_notification', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error2");
            });
        });
    };
    // ---------------------------------------------------------
    GlobalService.prototype.check_basic = function (data) {
        var _this = this;
        var headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
        });
        return new Promise(function (resolve, reject) {
            _this.http.post(_this.BaseUrl + 'check_basic_subscription', data, { "headers": headers }).subscribe(function (res) {
                resolve(res);
            }, function (err) {
                reject(err);
                alert("Service Error2");
            });
        });
    };
    GlobalService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], GlobalService);
    return GlobalService;
}());
export { GlobalService };
//# sourceMappingURL=global.service.js.map