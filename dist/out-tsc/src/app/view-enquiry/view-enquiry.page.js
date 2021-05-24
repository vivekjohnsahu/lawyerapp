import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../globalServices/global.service';
import { NgxSpinnerService } from 'ngx-spinner';
var ViewEnquiryPage = /** @class */ (function () {
    function ViewEnquiryPage(routers, globalService, spinner) {
        this.routers = routers;
        this.globalService = globalService;
        this.spinner = spinner;
        this.enquiry = {};
        this.param = this.routers.snapshot.params["id"];
    }
    ViewEnquiryPage.prototype.ngOnInit = function () {
        this.single_enquiry();
    };
    ViewEnquiryPage.prototype.single_enquiry = function () {
        var _this = this;
        this.spinner.show();
        var enquiry_data = {
            'apikey': this.globalService.APIKey,
            "id": this.param
        };
        this.globalService.single_enquiry(enquiry_data)
            .then(function (data) {
            _this.spinner.hide();
            _this.user_enquiry = new Array;
            _this.user_enquiry.push(data);
            _this.user_enquiry = _this.user_enquiry[0].data[0];
            _this.enquiry = {
                no: _this.user_enquiry.enquiry_no.trim(),
                email: _this.user_enquiry.email,
                fname: _this.user_enquiry.name,
                lname: _this.user_enquiry.lawyer_name,
                date: _this.user_enquiry.en_date,
                time: _this.user_enquiry.en_time,
                remarks: _this.user_enquiry.remarks
            };
        });
    };
    ViewEnquiryPage = tslib_1.__decorate([
        Component({
            selector: 'app-view-enquiry',
            templateUrl: './view-enquiry.page.html',
            styleUrls: ['./view-enquiry.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ActivatedRoute,
            GlobalService,
            NgxSpinnerService])
    ], ViewEnquiryPage);
    return ViewEnquiryPage;
}());
export { ViewEnquiryPage };
//# sourceMappingURL=view-enquiry.page.js.map