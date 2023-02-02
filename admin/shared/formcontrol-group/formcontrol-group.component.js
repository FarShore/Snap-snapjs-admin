import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
var FormcontrolGroupComponent = (function () {
    function FormcontrolGroupComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    FormcontrolGroupComponent.prototype.ngOnInit = function () {
        this.schemaKeys = Object.keys(this.schema.paths);
    };
    return FormcontrolGroupComponent;
}());
export { FormcontrolGroupComponent };
FormcontrolGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-group',
                template: "\n    <div class=\"form-group\" class=\"row\">\n      <label class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div [formGroup]=\"form\" class=\"col-sm-10\">\n        <div [formGroupName]=\"field\">\n          <div *ngFor=\"let key of schemaKeys\">\n            <div class=\"form-group\">\n              <label class=\"col-sm-2 control-label\">{{key}}</label>\n              <div class=\"col-sm-10\">\n                <input type=\"text\" [formControlName]=\"key\" class=\"form-control\" readonly=\"{{disabled}}\">\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolGroupComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
]; };
FormcontrolGroupComponent.propDecorators = {
    'form': [{ type: Input },],
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
    'schema': [{ type: Input },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-group.component.js.map