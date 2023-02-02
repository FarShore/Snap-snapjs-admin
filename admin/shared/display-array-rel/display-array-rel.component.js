import { Component, Input } from '@angular/core';
var DisplayArrayRelComponent = (function () {
    function DisplayArrayRelComponent() {
    }
    return DisplayArrayRelComponent;
}());
export { DisplayArrayRelComponent };
DisplayArrayRelComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-display-array-rel',
                template: "\n    <span><span *ngIf=\"field\"><strong>{{field}}: </strong></span>\n      <span *ngFor=\"let object of value; let i = index\" [attr.data-index]=\"i\">\n        <a [routerLink]=\"['/admin', className, object._id]\">{{object[displayKey]}}</a><span *ngIf=\"i !== value.length - 1\">, </span>\n      </span>\n    </span>\n  ",
                styles: ["\n\n  "],
            },] },
];
DisplayArrayRelComponent.ctorParameters = function () { return []; };
DisplayArrayRelComponent.propDecorators = {
    'field': [{ type: Input },],
    'displayKey': [{ type: Input },],
    'className': [{ type: Input },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=display-array-rel.component.js.map