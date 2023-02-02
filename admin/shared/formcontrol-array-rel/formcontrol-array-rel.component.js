import { Component, Input } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
var FormcontrolArrayRelComponent = (function () {
    function FormcontrolArrayRelComponent(formBuilder) {
        this.formBuilder = formBuilder;
    }
    FormcontrolArrayRelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.schemaKeys = Object.keys(this.schema.paths);
        var idIndex = this.schemaKeys.indexOf('_id');
        if (idIndex > -1) {
            this.schemaKeys.splice(idIndex, 1);
        }
        if (this.object[this.field]) {
            this.object[this.field].map(function (item) {
                _this.addItem(item);
            });
        }
    };
    FormcontrolArrayRelComponent.prototype.initItem = function (item) {
        if (item === void 0) { item = {}; }
        var formGroup = this.formBuilder.group({});
        this.schemaKeys.forEach(function (key) {
            formGroup.registerControl(key, new FormControl(item[key] || ''));
        });
        return formGroup;
    };
    FormcontrolArrayRelComponent.prototype.addItem = function (item) {
        if (item === void 0) { item = {}; }
        var control = this.form.get(this.field);
        control.push(this.initItem(item));
    };
    FormcontrolArrayRelComponent.prototype.removeItem = function (i) {
        var control = this.form.get(this.field);
        control.removeAt(i);
    };
    FormcontrolArrayRelComponent.prototype.getInputType = function (key) {
        if (this.schema.paths[key].instance === 'Date') {
            return 'datetime-local';
        }
        else if (this.schema.paths[key].instance === 'Number') {
            return 'number';
        }
        else if (this.schema.paths[key].instance === 'Boolean') {
            return 'checkbox';
        }
        else {
            return 'text';
        }
    };
    FormcontrolArrayRelComponent.prototype.updateFormValue = function (formControlValue, formControlName, inputType, index) {
        if (inputType === 'checkbox') {
            formControlValue = !formControlValue;
            var formGroup = this.form.get('questions')['controls'][index];
            formGroup.get(formControlName).patchValue(formControlValue);
        }
    };
    return FormcontrolArrayRelComponent;
}());
export { FormcontrolArrayRelComponent };
FormcontrolArrayRelComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-array-rel',
                template: "\n    <div [formGroup]=\"form\" class=\"row\">\n      <label class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div [formArrayName]=\"field\" class=\"col-sm-10\">\n        <div *ngFor=\"let item of form['controls'][field]['controls']; let i = index; \">\n          <div class=\"col-sm-offset-2 col-sm-10\">\n            <span>Item {{i + 1}}</span>\n            <span *ngIf=\"form['controls'][field]['controls'].length > 1 && !disabled\" (click)=\"removeItem(i)\">Remove</span>\n          </div>\n\n          <div *ngFor=\"let key of schemaKeys\" [formGroupName]=\"i\" class=\"form-group\">\n            <label class=\"col-sm-2 control-label\">{{key}}</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"{{getInputType(key)}}\"\n                [formControlName]=\"key\"\n                class=\"form-control\"\n                readonly=\"{{disabled}}\"\n                [checked]=\"form['controls'][field]['controls'][i]['controls'][key].value\"\n                (change)=\"updateFormValue(form['controls'][field]['controls'][i]['controls'][key].value, key, getInputType(key), i)\">\n              <div [hidden]=\"form['controls'][field]['controls'][i]['controls'][key].valid\" class=\"text-danger\">This is required</div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <div class=\"col-sm-offset-2 col-sm-10\" *ngIf=\"!disabled\">\n        <a (click)=\"addItem()\">\n          Add another item +\n        </a>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolArrayRelComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
]; };
FormcontrolArrayRelComponent.propDecorators = {
    'form': [{ type: Input },],
    'object': [{ type: Input },],
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
    'schema': [{ type: Input },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-array-rel.component.js.map