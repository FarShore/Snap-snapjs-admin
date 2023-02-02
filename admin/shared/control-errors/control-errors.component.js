import { Component, Input } from '@angular/core';
import { ValidationService } from './validation.service';
var ControlErrorsComponent = (function () {
    function ControlErrorsComponent(validationService) {
        this.validationService = validationService;
    }
    ControlErrorsComponent.prototype.errorMessage = function () {
        if (this.control) {
            for (var propertyName in this.control.errors) {
                if (this.control.errors.hasOwnProperty(propertyName)) {
                    return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
                }
            }
        }
        return null;
    };
    return ControlErrorsComponent;
}());
export { ControlErrorsComponent };
ControlErrorsComponent.decorators = [
    { type: Component, args: [{
                selector: 'control-errors',
                template: "<div *ngIf=\"!!errorMessage()\" class=\"form-control-error\">{{errorMessage()}}</div>",
            },] },
];
ControlErrorsComponent.ctorParameters = function () { return [
    { type: ValidationService, },
]; };
ControlErrorsComponent.propDecorators = {
    'control': [{ type: Input },],
};
//# sourceMappingURL=control-errors.component.js.map