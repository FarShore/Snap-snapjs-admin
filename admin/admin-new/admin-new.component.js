import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AdminService } from '../admin.service';
import { ValidationService } from '../shared/control-errors/validation.service';
import * as moment from 'moment';
var AdminNewComponent = (function () {
    function AdminNewComponent(router, route, toastr, adminService, validationService) {
        this.router = router;
        this.route = route;
        this.toastr = toastr;
        this.adminService = adminService;
        this.validationService = validationService;
        this.object = {};
    }
    AdminNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.adminService.className = params.className;
            _this.adminService.loadSchema();
        });
        this.submitFunction = this.submit.bind(this);
    };
    AdminNewComponent.prototype.submit = function (form) {
        var _this = this;
        var object = form.value;
        if (object) {
            for (var _i = 0, _a = Object.keys(this.adminService.schema); _i < _a.length; _i++) {
                var key = _a[_i];
                if ((!object[key] || !object[key].length) &&
                    this.adminService.schema[key].instance === 'ObjectID' && key !== '_id') {
                    object[key] = null;
                }
                if (key === 'password' && !object[key].match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                    var errors = { errors: {
                            password: {
                                message: 'Password must be at least 6 characters long, and contain a number.',
                            },
                        } };
                    this.toastr.error('There was an issue creating this.', 'Whoops!');
                    this.validationService.buildServerErrors(form, errors);
                    return;
                }
                if (this.adminService.schema[key].instance === 'Date' && object[key]) {
                    object[key] = moment(object[key]).subtract(this.adminService.tzOffsetInHours, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                }
            }
            this.adminService.create(object)
                .then(function (response) {
                _this.router.navigate(["/admin/" + _this.adminService.className, response._id]);
            })
                .catch(function (err) {
                var errors = err.json();
                _this.toastr.error('There was an issue creating this.', 'Whoops!');
                _this.validationService.buildServerErrors(form, errors);
            });
        }
    };
    return AdminNewComponent;
}());
export { AdminNewComponent };
AdminNewComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-new',
                template: "\n    <div class=\"container-fluid\">\n      <div class=\"page-header\">\n        <h1>Create New {{adminService.className || 'Object'}}</h1>\n      </div>\n  \n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"panel\">\n            <div class=\"panel-body\">\n              <app-admin-form *ngIf=\"adminService.schema\" [object]=\"object\" [schema]=\"adminService.schema\" [submitFunction]=\"submitFunction\"></app-admin-form>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
AdminNewComponent.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: ToastsManager, },
    { type: AdminService, },
    { type: ValidationService, },
]; };
//# sourceMappingURL=admin-new.component.js.map