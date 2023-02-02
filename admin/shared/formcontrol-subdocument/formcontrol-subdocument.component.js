import { Component, Input } from '@angular/core';
var FormcontrolSubdocumentComponent = (function () {
    function FormcontrolSubdocumentComponent() {
    }
    return FormcontrolSubdocumentComponent;
}());
export { FormcontrolSubdocumentComponent };
FormcontrolSubdocumentComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-subdocument',
                template: "\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div class=\"col-sm-10\">\n        {{value}}\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolSubdocumentComponent.ctorParameters = function () { return []; };
FormcontrolSubdocumentComponent.propDecorators = {
    'displayName': [{ type: Input },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-subdocument.component.js.map