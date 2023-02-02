import { Component, Input } from '@angular/core';
var DisplayTextComponent = (function () {
    function DisplayTextComponent() {
    }
    return DisplayTextComponent;
}());
export { DisplayTextComponent };
DisplayTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-display-text',
                template: "\n    <span><strong *ngIf=\"field\">{{field}}:</strong> {{isDate ? (value | date: \"MM/dd/yyyy h:mma\") : value}}</span>\n  ",
                styles: ["\n\n  "],
            },] },
];
DisplayTextComponent.ctorParameters = function () { return []; };
DisplayTextComponent.propDecorators = {
    'field': [{ type: Input },],
    'value': [{ type: Input },],
    'isDate': [{ type: Input },],
};
//# sourceMappingURL=display-text.component.js.map