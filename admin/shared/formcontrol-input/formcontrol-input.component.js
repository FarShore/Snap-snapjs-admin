import { Component, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
var FormcontrolInputComponent = (function () {
    function FormcontrolInputComponent(adminService) {
        this.adminService = adminService;
        this.inputType = 'input';
    }
    FormcontrolInputComponent.prototype.updateFormValue = function (formControlValue) {
        if (this.inputType === 'checkbox') {
            console.log("@snap---package");
            console.log(formControlValue.checked);
            // formControlValue = !formControlValue;
            this.form.patchValue((_a = {},
                    _a[this.field] = formControlValue.checked === true ? 'on' : 'off',
                    _a));    
           
        }
        var _a;
    };

    FormcontrolInputComponent.prototype.isChecked = function (formValue) {
            var isChk = false;
            console.log("@snap---isChecked")
            console.log(formValue);
            if(formValue === 'on'){
                isChk = true;
            } else if( formValue === 'off') {
                isChk = false;
            } else {
                isChk = formValue;
            }
            return isChk;
    };
    return FormcontrolInputComponent;
}());
export { FormcontrolInputComponent };
FormcontrolInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-input',
                template: "\n    <div [formGroup]=\"form\" class=\"form-group\">\n      <label *ngIf=\"inputType !== 'hidden'\" for=\"{{field}}\" class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div class=\"col-sm-10\">\n      <input [formControlName]=\"field\" type=\"{{inputType}}\" class=\"form-control\" [checked]=\"isChecked(form.controls[field].value)\"  (change)=\"updateFormValue($event.target)\">\n      <p class=\"text-muted\" *ngIf=\"inputType === 'datetime-local'\">timezone offset: {{adminService.tzOffsetInHours}}</p>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolInputComponent.ctorParameters = function () { return [
    { type: AdminService, },
]; };
FormcontrolInputComponent.propDecorators = {
    'form': [{ type: Input },],
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
    'inputType': [{ type: Input },],
    'value':[{type: Input},]
};
//# sourceMappingURL=formcontrol-input.component.js.map