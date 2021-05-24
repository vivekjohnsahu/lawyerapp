import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
var RegisterSelectPage = /** @class */ (function () {
    function RegisterSelectPage(router, spinner) {
        this.router = router;
        this.spinner = spinner;
    }
    RegisterSelectPage.prototype.ngOnInit = function () {
    };
    RegisterSelectPage.prototype.slideChanged = function (slide) {
        this.spinner.show();
        if (slide == 'lawyer_firm') {
            this.spinner.hide();
            this.router.navigateByUrl('/register');
        }
        else {
            this.spinner.hide();
            this.router.navigateByUrl('/register-user');
        }
    };
    RegisterSelectPage = tslib_1.__decorate([
        Component({
            selector: 'app-register-select',
            templateUrl: './register-select.page.html',
            styleUrls: ['./register-select.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, NgxSpinnerService])
    ], RegisterSelectPage);
    return RegisterSelectPage;
}());
export { RegisterSelectPage };
//# sourceMappingURL=register-select.page.js.map