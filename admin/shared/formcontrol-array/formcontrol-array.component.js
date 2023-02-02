import { Component, Input } from '@angular/core';
var FormcontrolArrayComponent = (function () {
    function FormcontrolArrayComponent() {
    }
    return FormcontrolArrayComponent;
}());
export { FormcontrolArrayComponent };
FormcontrolArrayComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-array',
                template: "\n    <div [formGroup]=\"form\" class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div class=\"col-sm-10\">\n        <!-- <tag-input [modelAsStrings]=\"true\" [formControlName]=\"field\" class=\"form-control\"></tag-input> -->\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolArrayComponent.ctorParameters = function () { return []; };
FormcontrolArrayComponent.propDecorators = {
    'form': [{ type: Input },],
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-array.component.js.map