import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var GrdFilterPipe = /** @class */ (function () {
    function GrdFilterPipe() {
    }
    GrdFilterPipe.prototype.transform = function (items, filter, defaultFilter) {
        if (!filter) {
            return items;
        }
        if (!Array.isArray(items)) {
            return items;
        }
        if (filter && Array.isArray(items)) {
            var filterKeys_1 = Object.keys(filter);
            if (defaultFilter) {
                return items.filter(function (item) {
                    return filterKeys_1.reduce(function (x, keyName) {
                        return (x && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] == "";
                    }, true);
                });
            }
            else {
                return items.filter(function (item) {
                    return filterKeys_1.some(function (keyName) {
                        return new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] == "";
                    });
                });
            }
        }
    };
    GrdFilterPipe = tslib_1.__decorate([
        Pipe({
            name: 'grdFilter'
        })
    ], GrdFilterPipe);
    return GrdFilterPipe;
}());
export { GrdFilterPipe };
//# sourceMappingURL=searchFilter.js.map