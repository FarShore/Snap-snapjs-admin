import { Component, Input } from '@angular/core';
var DisplayArrayComponent = (function () {
    function DisplayArrayComponent() {
    }
    return DisplayArrayComponent;
}());
export { DisplayArrayComponent };
DisplayArrayComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-display-array',
                template: "\n    <span *ngIf=\"value\">{{value.join(', ')}}</span>\n  ",
                styles: ["\n\n  "],
            },] },
];
DisplayArrayComponent.ctorParameters = function () { return []; };
DisplayArrayComponent.propDecorators = {
    'field': [{ type: Input },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=display-array.component.js.map