import { Component, Input } from '@angular/core';
import { AdminService } from '../../admin.service';
var DisplayArrayEmbeddedComponent = (function () {
    function DisplayArrayEmbeddedComponent(adminService) {
        this.adminService = adminService;
    }
    return DisplayArrayEmbeddedComponent;
}());
export { DisplayArrayEmbeddedComponent };
DisplayArrayEmbeddedComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-display-array-embedded',
                template: "\n    <div class=\"col-sm-10\">\n      <div *ngFor=\"let dataObject of value; let i = index\" class=\"row custom-object\">\n        <div class=\"row\">\n          <div *ngFor=\"let customObject of [adminService.schema[key].schema.paths]\">\n            <div class=\"col-sm-12\">\n              <app-schema-show\n              [schema]=\"customObject\"\n              [object]=\"value[i]\">\n              </app-schema-show>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    .custom-object{border:1px solid #ededed;border-radius:10px;padding:5px;margin-bottom:10px;background:rgba(240,240,240,0.5)}\n  "],
            },] },
];
DisplayArrayEmbeddedComponent.ctorParameters = function () { return [
    { type: AdminService, },
]; };
DisplayArrayEmbeddedComponent.propDecorators = {
    'value': [{ type: Input },],
    'key': [{ type: Input },],
};
//# sourceMappingURL=display-array-embedded.component.js.map