import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
var ManageEnquiryPage = /** @class */ (function () {
    function ManageEnquiryPage(router, globalService, spinner) {
        this.router = router;
        this.globalService = globalService;
        this.spinner = spinner;
        this.no_data = 2;
    }
    ManageEnquiryPage.prototype.ngOnInit = function () {
        this.get_enquiry();
    };
    ManageEnquiryPage.prototype.get_enquiry = function () {
        var _this = this;
        this.spinner.show();
        var user = JSON.parse(localStorage.getItem('details_user'));
        var pass_data = {
            "apikey": this.globalService.APIKey,
            "law_firm_id": user[0].id,
        };
        this.globalService.get_enquiry(pass_data)
            .then(function (data) {
            _this.spinner.hide();
            _this.user_enquiry = new Array;
            _this.user_enquiry.push(data);
            _this.user_enquiry = _this.user_enquiry[0].data;
            _this.no_data = 2;
            if (_this.user_enquiry == null) {
                _this.no_data = 1;
            }
        });
    };
    ManageEnquiryPage.prototype.view_enquiry = function (id) {
        this.router.navigateByUrl('/view-enquiry' + '/' + id);
    };
    ManageEnquiryPage = tslib_1.__decorate([
        Component({
            selector: 'app-manage-enquiry',
            templateUrl: './manage-enquiry.page.html',
            styleUrls: ['./manage-enquiry.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router,
            GlobalService,
            NgxSpinnerService])
    ], ManageEnquiryPage);
    return ManageEnquiryPage;
}());
export { ManageEnquiryPage };
//# sourceMappingURL=manage-enquiry.page.js.map