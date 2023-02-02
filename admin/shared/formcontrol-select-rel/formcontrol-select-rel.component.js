import { Component, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
var FormcontrolSelectRelComponent = (function () {
    function FormcontrolSelectRelComponent(adminService) {
        this.adminService = adminService;
        this.searchField = 'displayName';
        this.multiple = false;
        this.items = [];
    }
    FormcontrolSelectRelComponent.prototype.ngOnInit = function () {
        this.active = this.generateArray();
        if (this.multiple) {
            this.refreshValue(this.active);
        }
        else {
            this.refreshValue(this.active[0]);
        }
        this.typed('');
    };
    FormcontrolSelectRelComponent.prototype.refreshValue = function (data) {
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
    FormcontrolSelectRelComponent.prototype.selected = function (data) {
        console.log('selected', data);
    };
    FormcontrolSelectRelComponent.prototype.removed = function (data) {
        console.log('removed', data);
    };
    FormcontrolSelectRelComponent.prototype.typed = function (data) {
        var _this = this;
        this.adminService.search(this.searchClass, data, this.searchField)
            .then(function (response) {
            _this.items = response.items.map((function (o) {
                return { id: o._id, text: o[_this.searchField] };
            }));
        });
    };
    FormcontrolSelectRelComponent.prototype.generateArray = function () {
        var _this = this;
        var arrayData = [];
        if (this.object[this.field]) {
            if (this.object[this.field].constructor === Array) {
                arrayData = this.object[this.field].map(function (o) { return { id: o._id, text: o[_this.searchField] }; });
            }
            else {
                arrayData = [{ id: this.object[this.field]._id, text: this.object[this.field][this.searchField] }];
            }
        }
        return arrayData;
    };
    return FormcontrolSelectRelComponent;
}());
export { FormcontrolSelectRelComponent };
FormcontrolSelectRelComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-select-rel',
                template: "\n    <div class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div class=\"col-sm-10\">\n        <ng-select  [multiple]=\"multiple\"\n                    [items]=\"items\"\n                    [disabled]=\"form.controls[field].disabled\"\n                    [active]=\"active\"\n                    (data)=\"refreshValue($event)\"\n                    (selected)=\"selected($event)\"\n                    (removed)=\"removed($event)\"\n                    (typed)=\"typed($event)\"\n                    placeholder=\"Nothing selected\"></ng-select>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolSelectRelComponent.ctorParameters = function () { return [
    { type: AdminService, },
]; };
FormcontrolSelectRelComponent.propDecorators = {
    'form': [{ type: Input },],
    'object': [{ type: Input },],
    'searchClass': [{ type: Input },],
    'searchField': [{ type: Input },],
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
    'multiple': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-select-rel.component.js.map