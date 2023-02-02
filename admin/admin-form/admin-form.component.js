import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { AdminService } from '../admin.service';
import * as moment from 'moment';
var AdminFormComponent = (function () {
    function AdminFormComponent(formBuilder, adminService) {
        this.formBuilder = formBuilder;
        this.adminService = adminService;
        this.form = new FormGroup({});
        this.formSubmitted = false;
        this.schemaKeys = [];
        this.object = {};
        this.schema = {};
    }
    AdminFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.schema) {
            this.schemaKeys = Object.keys(this.schema);
        }
        var i = this.schemaKeys.length;
        while (i--) {
            if (this.schema[this.schemaKeys[i]].instanceOverride === 'Remove') {
                delete this.schema[this.schemaKeys[i]];
                this.schemaKeys.splice(i, 1);
            }
        }
        this.schemaKeys.forEach(function (key) {
            
            if ((_this.schema[key].instanceOverride === 'Array' || _this.schema[key].instance === 'Array') && _this.schema[key].schema) {
                _this.form.registerControl(key, _this.formBuilder.array([]));
                
            }
            else if ((_this.schema[key].instanceOverride === 'ImageArray' || _this.schema[key].instance === 'ImageArray')
                || (_this.schema[key].instanceOverride === 'FileArray' || _this.schema[key].instance === 'FileArray')) {
                _this.form.registerControl(key, _this.formBuilder.array([]));
            }
            else if (_this.schema[key].instanceOverride === 'Embedded' || _this.schema[key].instance === 'Embedded') {
                _this.form.registerControl(key, new FormGroup({}));
                var formGroup_1 = _this.form.get(key);
                var schemaPaths = Object.keys(_this.schema[key].schema.paths);
                
                schemaPaths.forEach(function (schemaPath) {
                    var value = _this.object[key] && _this.object[key][schemaPath] ? _this.object[key][schemaPath] : '';
                    formGroup_1.registerControl(schemaPath, new FormControl(value));
                });
            }
            else {               
                var value = '';
                if (key.indexOf('.') >= 0) {
                    var array = key.split('.');
                    if (_this.object[array[0]] && _this.object[array[0]][array[1]]) {
                        value = _this.object[array[0]][array[1]];
                    }
                }
                else if (_this.object[key] && _this.schema[key].instance === 'Date') {
                    value = moment(_this.object[key]).format('YYYY-MM-DDTHH:mm');
                }
                else if (_this.object[key] && _this.schema[key].instance !== 'Date') {
                    value = _this.object[key];
                }
                else if (_this.object[key] && _this.schema[key].instance !== 'Boolean') {
                    value = _this.object[key].defaultValue;
                }
                var disabled = void 0;
                if (_this.schema[key].instanceOverride === 'Disabled') {
                    disabled = true;
                }
                else if (_this.schema[key].instanceOptions && _this.schema[key].instanceOptions.disabled) {
                    disabled = true;
                }
                else {
                    disabled = false;
                }
                _this.form.registerControl(key, new FormControl({ value: value, disabled: disabled }, []));
                
            }
        });
    };
    AdminFormComponent.prototype.submit = function () {
        if (this.form.valid && this.submitFunction) {
            this.submitFunction(this.form);
            console.log(this.form)
        }
    };
    return AdminFormComponent;
}());
export { AdminFormComponent };
AdminFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-form',
                template: "\n    <form novalidate [formGroup]=\"form\" (ngSubmit)=\"submit()\" class=\"form-horizontal\">\n      <div *ngFor=\"let schemaKey of schemaKeys\">\n        <div [ngSwitch]=\"schema[schemaKey].instanceOverride || schema[schemaKey].instance\">\n\n          <app-formcontrol-input\n            *ngSwitchCase=\"'Boolean'\"\n            [form]=\"form\"\n            [field]=\"schemaKey\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n  [value]=\"schema[schemaKey].defaultValue\"     [inputType]=\"'checkbox'\">\n          </app-formcontrol-input>\n\n          <app-formcontrol-input\n            *ngSwitchCase=\"'Number'\"\n            [form]=\"form\"\n            [field]=\"schemaKey\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n            [inputType]=\"'number'\">\n          </app-formcontrol-input>\n\n          <app-formcontrol-input\n            *ngSwitchCase=\"'Date'\"\n            [form]=\"form\"\n            [field]=\"schemaKey\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n            [inputType]=\"'datetime-local'\">\n          </app-formcontrol-input>\n\n          <app-formcontrol-input\n            *ngSwitchCase=\"'Hidden'\"\n            [form]=\"form\"\n            [field]=\"schemaKey\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n            [inputType]=\"'hidden'\">\n          </app-formcontrol-input>\n\n          <app-formcontrol-input\n            *ngSwitchCase=\"'Disabled'\"\n            [form]=\"form\"\n            [field]=\"schemaKey\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n            [inputType]=\"'text'\">\n          </app-formcontrol-input>\n\n          <app-formcontrol-select\n            *ngSwitchCase=\"'SingleSelect'\"\n            [form]=\"form\"\n            [object]=\"object\"\n            [field]=\"schemaKey\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n            [multiple]=\"false\"\n            [items]=\"schema[schemaKey].options\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\">\n          </app-formcontrol-select>\n\n          <app-formcontrol-select\n            *ngSwitchCase=\"'MultiSelect'\"\n            [form]=\"form\"\n            [object]=\"object\"\n            [field]=\"schemaKey\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n            [multiple]=\"true\"\n            [items]=\"schema[schemaKey].options\"\n            [displayName]=\"schema[schemaKey].displayName || schemaKey\">\n          </app-formcontrol-select>\n\n          <!-- Array of subdocuments -->\n          <div *ngSwitchCase=\"'Array'\">\n            <app-formcontrol-array-rel\n              *ngIf=\"schema[schemaKey].schema\"\n              [disabled]=\"schema[schemaKey].instanceOptions && schema[schemaKey].instanceOptions.disabled\" \n              [form]=\"form\"\n              [object]=\"object\" \n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n              [schema]=\"schema[schemaKey].schema\">\n            </app-formcontrol-array-rel>\n          </div>\n\n          <!-- Single select for relationship (searches for matches) -->\n          <div *ngSwitchCase=\"'ObjectID'\">\n            <app-formcontrol-select-rel \n              *ngIf=\"schema[schemaKey].options && schema[schemaKey].options.ref\" \n              [form]=\"form\" \n              [object]=\"object\" \n              [searchClass]=\"schema[schemaKey].options.ref\" \n              [searchField]=\"schema[schemaKey].searchField\" \n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\" \n              [multiple]=\"false\">  \n            </app-formcontrol-select-rel>\n          </div>\n\n          <!-- Select array of relationships (searches for matches) -->\n          <div *ngSwitchCase=\"'Array'\">\n            <app-formcontrol-select-rel \n              *ngIf=\"schema[schemaKey].caster.options && schema[schemaKey].caster.options.ref\"\n              [form]=\"form\" \n              [object]=\"object\" \n              [searchClass]=\"schema[schemaKey].caster.options.ref\"\n              [searchField]=\"schema[schemaKey].searchField\"\n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n              [multiple]=\"true\">\n            </app-formcontrol-select-rel>\n          </div>\n\n          <!-- Select array of strings -->\n          <div *ngSwitchCase=\"'Array'\">\n            <app-formcontrol-array\n              *ngIf=\"schema[schemaKey].caster.options && !schema[schemaKey].caster.options.ref\"\n              [form]=\"form\" \n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\">\n            </app-formcontrol-array>\n          </div>\n\n          <!-- Single embedded document -->\n          <div *ngSwitchCase=\"'Embedded'\">\n            <app-formcontrol-group\n              [disabled]=\"schema[schemaKey].instanceOptions && schema[schemaKey].instanceOptions.disabled\"\n              [form]=\"form\"\n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n              [schema]=\"schema[schemaKey].schema\">\n            </app-formcontrol-group>\n          </div>\n\n          <!-- Wysiwyg editor -->\n          <div *ngSwitchCase=\"'Wysiwyg'\">\n            <app-formcontrol-tinymce \n              [form]=\"form\" \n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\">\n            </app-formcontrol-tinymce>\n          </div>\n\n          <!-- Images -->\n          <div *ngSwitchCase=\"'Image'\">\n            <app-formcontrol-file-upload\n              [isMultiple]=\"false\"\n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n              [object]=\"object\"\n              [allowedMimeType]=\"schema[schemaKey].allowedMimeType\"\n              [maxFileSize]=\"schema[schemaKey].maxFileSize\"\n              [form]=\"form\">\n            </app-formcontrol-file-upload>\n          </div>\n\n          <!-- File -->\n          <div *ngSwitchCase=\"'File'\">\n            <app-formcontrol-file-upload\n              [isMultiple]=\"false\"\n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n              [object]=\"object\"\n              [allowedMimeType]=\"schema[schemaKey].allowedMimeType\"\n              [maxFileSize]=\"schema[schemaKey].maxFileSize\"\n              [form]=\"form\">\n            </app-formcontrol-file-upload>\n          </div>\n\n          <!-- Multiple images -->\n          <div *ngSwitchCase=\"'ImageArray'\">\n            <app-formcontrol-file-upload\n              [isMultiple]=\"true\"\n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n              [object]=\"object\"\n              [allowedMimeType]=\"schema[schemaKey].allowedMimeType\"\n              [maxFileSize]=\"schema[schemaKey].maxFileSize\"\n              [form]=\"form\">\n            </app-formcontrol-file-upload>\n          </div>\n\n          <!-- Multiple files -->\n          <div *ngSwitchCase=\"'FileArray'\">\n            <app-formcontrol-file-upload\n              [isMultiple]=\"true\"\n              [field]=\"schemaKey\"\n              [displayName]=\"schema[schemaKey].displayName || schemaKey\"\n              [object]=\"object\"\n              [allowedMimeType]=\"schema[schemaKey].allowedMimeType\"\n              [maxFileSize]=\"schema[schemaKey].maxFileSize\"\n              [form]=\"form\">\n            </app-formcontrol-file-upload>\n          </div>\n\n          <!-- SubDocument -->\n          <div *ngSwitchCase=\"'SubDocument'\">\n            <app-formcontrol-subdocument\n              *ngIf=\"object[schemaKey]\"\n              [displayName]=\"schema[schemaKey].displayName\"\n              [value]=\"schema[schemaKey].displayKey ? object[schemaKey][schema[schemaKey].displayKey] : object[schemaKey]\">\n            </app-formcontrol-subdocument>\n          </div>\n\n          <!-- Default input type -->\n          <div *ngSwitchDefault>\n            <app-formcontrol-input [form]=\"form\" [field]=\"schemaKey\" [inputType]=\"'text'\" [displayName]=\"schema[schemaKey].displayName || schemaKey\"></app-formcontrol-input>\n          </div>\n        </div>\n\n        <!-- Display validation errors -->\n        <control-errors [control]=\"form.controls[schemaKey]\"></control-errors>\n      </div>\n\n      <!-- <button type=\"submit\" [disabled]=\"!form.valid\">Save</button> -->\n      <button type=\"submit\">Save</button>\n    </form>\n  ",
                styles: ["\n\n  "],
            },] },
];
AdminFormComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
    { type: AdminService, },
]; };
AdminFormComponent.propDecorators = {
    'object': [{ type: Input },],
    'schema': [{ type: Input },],
    'submitFunction': [{ type: Input },],
};
//# sourceMappingURL=admin-form.component.js.map