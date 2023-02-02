import { Component, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConstantsService } from '../constants.service';
var AdminListComponent = (function () {
    function AdminListComponent(router, route, adminService, toastr, vRef, constants, changeDetectorRef) {
        this.router = router;
        this.route = route;
        this.adminService = adminService;
        this.toastr = toastr;
        this.vRef = vRef;
        this.constants = constants;
        this.changeDetectorRef = changeDetectorRef;
        this.params = { skip: 0, sort: '-createdAt' };
        this.itemsPerPage = 20;
        this.currentPage = 1;
        this.selectedItems = [];
        this.toggle = {};
        this.form = new FormGroup({});
        this.filters = [{ field: '', operator: '', value: '' }];
        this.toastr.setRootViewContainerRef(vRef);
    }
    AdminListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.resetFilters();
            _this.adminService.className = params.className;
            _this.adminService.loadSchema()
                .then(function (response) {
                _this.changeDetectorRef.markForCheck();
                _this.findAll();
            });
        });
        this.filterFunction = this.findAll.bind(this);
    };
    AdminListComponent.prototype.findAll = function (params) {
        var _this = this;
        this.selectAll = false;
        this.selectedItems = [];
        this.params = params || { limit: this.itemsPerPage, skip: this.params.skip, sort: this.params.sort };
        this.adminService.query(this.params)
            .then(function (response) {
            _this.totalObjects = response.itemCount;
            _this.objects = response.items;
        });
    };
    AdminListComponent.prototype.pageChanged = function () {
        this.params.skip = this.itemsPerPage * (this.currentPage - 1);
        this.findAll(this.params);
        this.selectAll = false;
        this.selectedItems = [];
    };
    AdminListComponent.prototype.deleteItem = function (object) {
        var _this = this;
        if (window.confirm('Are you sure you want to delete')) {
            this.adminService.delete(object)
                .then(function () {
                _this.findAll();
                _this.toastr.success('Successfully deleted.', 'Success!');
            })
                .catch(function (err) {
                console.error(err);
            });
        }
    };
    AdminListComponent.prototype.deleteMultiple = function (objectIds) {
        var _this = this;
        if (window.confirm('Are you sure?')) {
            this.adminService.deleteMultiple(objectIds)
                .then(function (response) {
                _this.selectedItems = [];
                _this.findAll();
                _this.toastr.success('Successfully deleted');
            })
                .catch(function (err) {
                console.error(err);
            });
        }
        else {
            this.clearSelections();
        }
    };
    AdminListComponent.prototype.clearSelections = function () {
        this.selectAll = false;
        this.selectedItems = [];
        this.objects.forEach(function (object) {
            object.Selected = false;
        });
    };
    AdminListComponent.prototype.toggleAllSelection = function () {
        var _this = this;
        this.selectAll = !this.selectAll;
        this.selectedItems = this.objects.map(function (object) {
            object.Selected = _this.selectAll;
            return object._id;
        });
        if (!this.selectAll) {
            this.selectedItems = [];
        }
    };
    AdminListComponent.prototype.toggleSelection = function (objectId) {
        var index = this.selectedItems.indexOf(objectId);
        index >= 0 ? this.selectedItems.splice(index, 1) : this.selectedItems.push(objectId);
        this.selectAll = this.selectedItems.length === this.objects.length;
    };
    AdminListComponent.prototype.updateSort = function (key) {
        var isDesc = !!this.params.sort.lastIndexOf('-', 0);
        this.params.sort = isDesc ? "-" + key : key;
        this.toggle[key] = !isDesc;
        this.findAll(this.params);
    };
    AdminListComponent.prototype.exportToCsv = function () {
        var token = localStorage.getItem('token');
        var exportUrl = this.constants.API_BASE_URL + "/admin/" + this.adminService.className + "?export=true&access_token=" + token + "&";
        var exportParams = this.params;
        delete exportParams.skip;
        delete exportParams.limit;
        exportUrl += this.adminService.serializeParams(this.params).toString();
        window.open(exportUrl);
    };
    AdminListComponent.prototype.updateFile = function (event) {
        this.uploadedFile = event;
    };
    AdminListComponent.prototype.toggleImport = function () {
        this.uploadedFile = '';
        if (this.importToggle) {
            this.importToggle = false;
        }
        else {
            this.importToggle = true;
        }
    };
    AdminListComponent.prototype.importFromCsv = function () {
        var _this = this;
        if (this.uploadedFile !== '') {
            this.importLoading = true;
            this.adminService.importFromCsv(this.uploadedFile)
                .then(function (response) {
                _this.findAll();
                _this.importLoading = false;
                _this.importToggle = false;
                _this.uploadedFile = '';
                _this.toastr.success('Successfully imported');
            }, function (error) {
                _this.findAll();
                _this.importLoading = false;
                _this.importToggle = false;
                _this.uploadedFile = '';
                var message = _this.buildServerErrors(error) || 'Import Error';
                _this.toastr.error(message, null, { enableHTML: true });
            });
        }
        else {
            this.toastr.error('You need to upload a file before importing');
        }
    };
    AdminListComponent.prototype.cancelImport = function () {
        this.importToggle = false;
        this.uploadedFile = '';
    };
    AdminListComponent.prototype.resetFilters = function () {
        this.filters = [{ field: '', operator: '', value: '' }];
        this.filterToggle = false;
    };
    AdminListComponent.prototype.buildServerErrors = function (error) {
        var errorMessage = '';
        var errors = error.json().errors;
        for (var key in errors) {
            if (errors.hasOwnProperty(key)) {
                var message = errors[key].message;
                errorMessage += message + "</br>";
            }
        }
        return errorMessage;
    };
    return AdminListComponent;
}());
export { AdminListComponent };
AdminListComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-admin-list',
                template: "\n    <div class=\"container-fluid\">\n      <div class=\"page-header\">\n        <h1>{{adminService.className}}</h1>\n        <div class=\"actions\">\n          <a [routerLink]=\"['/admin', adminService.className, 'new']\" class=\"btn btn-primary\"><i class=\"fa fa-plus\"></i> Create</a>\n          <a (click)=\"exportToCsv()\" class=\"btn btn-default\"><i class=\"fa fa-file-o\" aria-hidden=\"true\"></i> Export to CSV</a>\n          <a (click)=\"toggleImport()\" class=\"btn btn-default\">\n            <i class=\"fa fa-file-o\" aria-hidden=\"true\"></i>\n            <span *ngIf=\"importToggle\"> Hide import</span>\n            <span *ngIf=\"!importToggle\"> Import from CSV</span>\n          </a>    \n          <a (click)=\"filterToggle = !filterToggle\" class=\"btn btn-default\">\n            <i class=\"fa fa-filter\"></i>\n            <span *ngIf=\"filterToggle\"> Hide Filter</span>\n            <span *ngIf=\"!filterToggle\"> Show Filter</span>\n          </a>\n        </div>\n      </div>\n\n      <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"panel\">\n            <div class=\"panel-body table-responsive\">\n              <div *ngIf=\"importToggle\" class=\"col-md-12\">\n                <app-file-drop\n                  [file]=\"uploadedFile\"\n                  (change)=\"updateFile($event)\">\n                </app-file-drop>\n           \n                <div class=\"pull-right\">\n                  <button (click)=\"importFromCsv()\" class=\"margin-top btn btn-primary\" [disabled]=\"importLoading\">\n                    <i class=\"fa fa-file-o\" aria-hidden=\"true\"></i>\n                    Import\n                  </button>\n                  <button (click)=\"cancelImport()\" class=\"margin-top btn btn-default\" [disabled]=\"importLoading\">\n                    <i class=\"fa fa-file-o\" aria-hidden=\"true\"></i>\n                    Cancel\n                  </button>\n                  <div *ngIf=\"importLoading\">\n                    <i class=\"fa fa-spinner fa-spin\"></i> \n                    Loading...\n                  </div>\n                </div>\n              </div>\n              <app-filter\n                *ngIf=\"adminService.schema && filterToggle\"\n                [filters]=\"filters\"\n                [schema]=\"adminService.schema\"\n                [findAll]=\"filterFunction\"\n                [itemsPerPage]=\"itemsPerPage\"\n                [skip]=\"params.skip\"\n                [sort]=\"params.sort\">\n              </app-filter>\n              <button *ngIf=\"selectedItems.length\" class=\"btn btn-danger\" (click)=\"deleteMultiple(selectedItems)\">Delete ({{selectedItems.length}}) Items</button>\n              <table class=\"table table-hover\">\n                <thead>\n                  <tr>\n                    <th class=\"wordwrap-none\">\n                      <input [(ngModel)]=\"selectAll\" (click)=\"toggleAllSelection()\" type=\"checkbox\">\n                    </th>\n                    <ng-template ngFor let-key [ngForOf]=\"adminService.schemaKeys\">\n                      <th class=\"wordwrap-none text-muted\"\n                        *ngIf=\"adminService.schema[key] &&\n                        adminService.schema[key].instanceOverride !== 'Hidden' && adminService.schema[key].instanceOverride !== 'Wysiwyg' &&\n                        adminService.schema[key].instanceOverride !== 'Remove'\">\n                        <a *ngIf=\"adminService.schema[key]\" (click)=\"updateSort(key)\">\n                          {{adminService.schema[key].displayName || key}}\n                          <i [ngClass]=\"toggle[key] ? 'fa fa-caret-up' : 'fa fa-caret-down'\"></i>\n                        </a>\n                      </th>\n                    </ng-template>\n                    <th></th>\n                    <th></th>\n                    <th></th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngFor=\"let object of objects\">\n                    <td><input type=\"checkbox\" [(ngModel)]=\"object.Selected\" (click)=\"toggleSelection(object._id)\"></td>\n\n                    <ng-template ngFor let-schemaKey [ngForOf]=\"adminService.schemaKeys\">\n                      <td\n                        *ngIf=\"adminService.schema[schemaKey].instanceOverride !== 'Hidden' && adminService.schema[schemaKey].instanceOverride !== 'Wysiwyg' && \n                        adminService.schema[schemaKey].instanceOverride !== 'Remove'\"\n                        [ngSwitch]=\"adminService.schema[schemaKey].instanceOverride || adminService.schema[schemaKey].instance\">\n\n                        <!-- Image -->\n                        <div *ngSwitchCase=\"'Image'\">\n                          <span>\n                            <div class=\"row\">\n                              <app-display-file\n                                *ngIf=\"object[schemaKey] && object[schemaKey].url\"\n                                [files]=\"[object[schemaKey]]\">\n                              </app-display-file>\n                            </div>\n                          </span>\n                        </div>\n\n                        <!-- Multiple Images -->\n                        <div *ngSwitchCase=\"'ImageArray'\">\n                          <span>\n                            <div class=\"row\">\n                              <app-display-file\n                                [files]=\"object[schemaKey]\">\n                              </app-display-file>\n                            </div>\n                          </span>\n                        </div>\n\n                        <!-- File -->\n                        <div *ngSwitchCase=\"'File'\">\n                          <span>\n                            <div class=\"row\">\n                              <app-display-file\n                                *ngIf=\"object[schemaKey]\"\n                                [files]=\"[object[schemaKey]]\">\n                              </app-display-file>\n                            </div>\n                          </span>\n                        </div>\n\n                        <!-- Multiple Files -->\n                        <div *ngSwitchCase=\"'FileArray'\">\n                          <span>\n                            <div class=\"row\">\n                              <app-display-file\n                                [files]=\"object[schemaKey]\">\n                              </app-display-file>\n                            </div>\n                          </span>\n                        </div>\n\n                        <!-- Select array of strings -->\n                        <div *ngSwitchCase=\"'Array'\">\n                          <app-display-array\n                            *ngIf=\"adminService.schema[schemaKey].caster && adminService.schema[schemaKey].caster.options && !adminService.schema[schemaKey].caster.options.ref && object[schemaKey]\"\n                            [value]=\"object[schemaKey]\"> \n                          </app-display-array>\n                        </div>\n\n                        <!-- Multi select of strings -->\n                        <div *ngSwitchCase=\"'MultiSelect'\">\n                          <app-display-array\n                            [value]=\"object[schemaKey]\"> \n                          </app-display-array>\n                        </div>\n\n                        <!-- Single relationship -->\n                        <div *ngSwitchCase=\"'ObjectID'\">\n                          <app-display-single-rel \n                            *ngIf=\"adminService.schema[schemaKey].options &&\n                                    adminService.schema[schemaKey].options.ref &&\n                                    schemaKey !== '_id'\"\n                            [value]=\"object[schemaKey]\"\n                            [className]=\"adminService.schema[schemaKey].options.ref\"\n                            [displayKey]=\"adminService.schema[schemaKey].displayKey || adminService.schema[schemaKey].searchField\">\n                          </app-display-single-rel>\n                        </div>\n\n                        <!-- Select array of relationships -->\n                        <div *ngSwitchCase=\"'Array'\">\n                          <app-display-array-rel \n                            *ngIf=\"adminService.schema[schemaKey].caster && adminService.schema[schemaKey].caster.options && adminService.schema[schemaKey].caster.options.ref\"\n                            [className]=\"adminService.schema[schemaKey].caster.options.ref\"\n                            [displayKey]=\"adminService.schema[schemaKey].displayKey || adminService.schema[schemaKey].searchField\"\n                            [value]=\"object[schemaKey]\">\n                          </app-display-array-rel>\n                        </div>\n\n                        <!-- Object Id -->\n                        <div *ngSwitchCase=\"'ObjectID'\">\n                          <p *ngIf=\"schemaKey === '_id'\">{{object[schemaKey]}}</p>\n                        </div>\n\n                        <!-- Array of embedded schemas or custom objects -->\n                        <div *ngSwitchCase=\"'Array'\">\n                          <div class=\"truncate\" *ngIf=\"!adminService.schema[schemaKey].caster && adminService.schema[schemaKey].schema.tree.id\">\n                            <i class=\"text-muted\">Embedded</i>\n                          </div>\n                        </div>\n\n                        <!-- Single embedded document -->\n                        <div *ngSwitchCase=\"'Embedded'\">\n                          <div class=\"truncate\"><i class=\"text-muted\">Embedded</i></div>\n                        </div>\n\n                        <!-- SubDocument -->\n                        <div *ngSwitchCase=\"'SubDocument'\">\n                          <app-display-text\n                            [value]=\"object[schemaKey] && adminService.schema[schemaKey].displayKey ? object[schemaKey][adminService.schema[schemaKey].displayKey] : object[schemaKey]\">\n                          </app-display-text>\n                        </div>\n\n                        <!-- Single custom object -->\n                        <div *ngSwitchCase=\"'CustomObject'\">\n                          <div class=\"truncate\"><i class=\"text-muted\">Embedded</i></div>\n                        </div>\n\n                        <!-- Date type -->\n                        <div *ngSwitchCase=\"'Date'\">\n                          <app-display-text\n                            [value]=\"object[schemaKey]\"\n                            [isDate]=\"true\">\n                          </app-display-text>\n                        </div>\n\n                        <!-- Default type -->\n                        <!-- Leave the value blank if it's a password -->\n                        <div *ngSwitchDefault>\n                          <app-display-text *ngIf=\"schemaKey !== 'password'\"\n                            [value]=\"object[schemaKey]\">\n                          </app-display-text>\n                          <app-display-text *ngIf=\"schemaKey === 'password'\"\n                            [value]=\"\">\n                          </app-display-text>\n                        </div>\n                    \n                      </td>\n                    </ng-template>\n\n                    <td>\n                      <a [routerLink]=\"['/admin', adminService.className, object._id]\" class=\"btn btn-default btn-sm\">View</a>\n                    </td>\n                    <td>\n                      <button (click)=\"deleteItem(object)\" class=\"btn btn-default btn-sm\">Delete</button>\n                    </td>\n                    <td>\n                      <a [routerLink]=\"['/admin', adminService.className, object._id, 'edit']\" class=\"btn btn-default btn-sm\">Edit</a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <ngb-pagination [collectionSize]=\"totalObjects\" [pageSize]=\"itemsPerPage\" [(page)]=\"currentPage\" [boundaryLinks]=\"true\" [maxSize]=\"5\" [ellipses]=\"true\" (pageChange)=\"pageChanged()\"></ngb-pagination>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
AdminListComponent.ctorParameters = function () { return [
    { type: Router, },
    { type: ActivatedRoute, },
    { type: AdminService, },
    { type: ToastsManager, },
    { type: ViewContainerRef, },
    { type: ConstantsService, },
    { type: ChangeDetectorRef, },
]; };
//# sourceMappingURL=admin-list.component.js.map