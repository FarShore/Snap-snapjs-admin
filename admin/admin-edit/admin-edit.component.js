import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AdminService } from '../admin.service';
import { ValidationService } from '../shared/control-errors/validation.service';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';
var AdminEditComponent = (function () {
    function AdminEditComponent(route, router, toastr, adminService, validationService) {
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.adminService = adminService;
        this.validationService = validationService;
    }
    AdminEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) {
            _this.adminService.className = params.className;
            _this.adminService.loadSchema();
            return _this.adminService.getById(params.id);
        })
            .subscribe(function (object) { return _this.object = object; });
        this.submitFunction = this.submit.bind(this);
    };
    AdminEditComponent.prototype.submit = function (form) {
        var _this = this;
        var object = form.value;
        if (object) {
            for (var _i = 0, _a = Object.keys(this.adminService.schema); _i < _a.length; _i++) {
                var key = _a[_i];
                if ((!object[key] || !object[key].length) &&
                    ((this.adminService.schema[key].instance === 'ObjectID' && key !== '_id') ||
                        key === 'password')) {
                    delete object[key];
                }
                if ((key === 'password' && object[key] && object[key].length) && !object[key].match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
                    var errors = { errors: {
                            password: {
                                message: 'Password must be at least 6 characters long, and contain a number.',
                            },
                        } };
                    this.validationService.buildServerErrors(form, errors);
                    return;
                }
                if (this.adminService.schema[key].instance === 'Date' && object[key]) {
                    object[key] = moment(object[key]).subtract(this.adminService.tzOffsetInHours, 'hours').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
                }
                if (this.adminService.schema[key].instance === 'Boolean' && object[key]) {
                    if(object[key] === 'on'){
                        object[key] = true;
                    } else if (object[key] === 'off'){
                        object[key] = false;
                    } else {
                        object[key] = object[key];
                    }
                }
            }
            this.adminService.update(object)
                .then(function (response) {
                _this.router.navigate(["/admin/" + _this.adminService.className, object._id]);
            })
                .catch(function (err) {
                var errors = err.json();
                _this.toastr.error('There was an issue saving this.', 'Whoops!');
                _this.validationService.buildServerErrors(form, errors);
            });
        }
    };
    return AdminEditComponent;
}());
export { AdminEditComponent };
AdminEditComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-edit',
                template: "\n    <div class=\"container-fluid\">\n      <div *ngIf=\"!object\">\n        <i class=\"fa fa-spinner fa-spin\"></i> Loading...\n      </div>\n\n      <div *ngIf=\"object\">\n        <div class=\"page-header\">\n          <h1>Edit: {{object.name}}</h1>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-lg-12\">\n            <div class=\"panel\">\n              <div class=\"panel-body\">\n                <app-admin-form [object]=\"object\" [schema]=\"adminService.schema\" [submitFunction]=\"submitFunction\"></app-admin-form>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
AdminEditComponent.ctorParameters = function () { return [
    { type: ActivatedRoute, },
    { type: Router, },
    { type: ToastsManager, },
    { type: AdminService, },
    { type: ValidationService, },
]; };
//# sourceMappingURL=admin-edit.component.js.map