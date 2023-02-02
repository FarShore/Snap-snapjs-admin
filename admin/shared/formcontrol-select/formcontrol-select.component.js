import { Component, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
var FormcontrolSelectComponent = (function () {
    function FormcontrolSelectComponent(adminService) {
        this.adminService = adminService;
        this.multiple = false;
        this.items = [];
    }
    FormcontrolSelectComponent.prototype.ngOnInit = function () {
        this.active = this.generateArray();
        if (this.multiple) {
            this.refreshValue(this.active);
        }
        else {
            this.refreshValue(this.active[0]);
        }
    };
    FormcontrolSelectComponent.prototype.refreshValue = function (data) {
        if (data) {
            if (data.constructor === Array) {
                var ids = data.map(function (o) { return o.id; });
                this.form.get(this.field).patchValue(ids);
            }
            else {
                this.form.get(this.field).patchValue(data.id);
            }
        }
    };
    FormcontrolSelectComponent.prototype.selected = function (data) {
        console.log('selected', data);
    };
    FormcontrolSelectComponent.prototype.removed = function (data) {
        console.log('removed', data);
    };
    FormcontrolSelectComponent.prototype.generateArray = function () {
        var arrayData = [];
        if (this.object[this.field]) {
            if (this.object[this.field].constructor === Array) {
                arrayData = this.object[this.field].map(function (o) { return { id: o, text: o }; });
            }
            else {
                arrayData = [{ id: this.object[this.field], text: this.object[this.field] }];
            }
        }
        return arrayData;
    };
    return FormcontrolSelectComponent;
}());
export { FormcontrolSelectComponent };
FormcontrolSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-select',
                template: "\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div class=\"col-sm-10\">\n        <ng-select  [multiple]=\"multiple\"\n                    [items]=\"items\"\n                    [disabled]=\"form.controls[field].disabled\"\n                    [active]=\"active\"\n                    (data)=\"refreshValue($event)\"\n                    (selected)=\"selected($event)\"\n                    (removed)=\"removed($event)\"\n                    placeholder=\"Nothing selected\"></ng-select>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolSelectComponent.ctorParameters = function () { return [
    { type: AdminService, },
]; };
FormcontrolSelectComponent.propDecorators = {
    'form': [{ type: Input },],
    'object': [{ type: Input },],
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
    'multiple': [{ type: Input },],
    'items': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-select.component.js.map