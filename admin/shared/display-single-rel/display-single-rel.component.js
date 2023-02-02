import { Component, Input } from '@angular/core';
var DisplaySingleRelComponent = (function () {
    function DisplaySingleRelComponent() {
    }
    return DisplaySingleRelComponent;
}());
export { DisplaySingleRelComponent };
DisplaySingleRelComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-display-single-rel',
                template: "\n    <span><strong *ngIf=\"field\">{{field}}:</strong> <a *ngIf=\"value\" [routerLink]=\"['/admin', className, value._id]\">{{value[displayKey] || value}}</a></span>\n  ",
                styles: ["\n\n  "],
            },] },
];
DisplaySingleRelComponent.ctorParameters = function () { return []; };
DisplaySingleRelComponent.propDecorators = {
    'field': [{ type: Input },],
    'displayKey': [{ type: Input },],
    'className': [{ type: Input },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=display-single-rel.component.js.map