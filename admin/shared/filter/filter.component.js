import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { FilterService } from './filter.service';
import * as moment from 'moment';
var FilterComponent = (function () {
    function FilterComponent(adminService, filterService) {
        this.adminService = adminService;
        this.filterService = filterService;
        this.form = new FormGroup({});
    }
    FilterComponent.prototype.addFilters = function () {
        this.filters.push({ field: '', operator: '', value: '' });
    };
    FilterComponent.prototype.findAllWithFilters = function () {
        this.query = this.filterService.buildQuery(this.filters, this.itemsPerPage, this.skip, this.sort);
        this.findAll(this.query);
    };
    FilterComponent.prototype.resetFilters = function () {
        this.findAll();
    };
    FilterComponent.prototype.clearFilters = function () {
        this.filters.length = 0;
        this.addFilters();
        this.resetFilters();
        window.history.pushState({}, document.title, window.location.href.split('?')[0]);
    };
    FilterComponent.prototype.combineDateTime = function (filter) {
        var date = moment(filter.date).format('YYYY-MM-DD');
        var time = moment(filter.time).format('kk:mm:ss Z');
        if (moment(filter.date).isDST()) {
            time = moment(filter.time).subtract(60, 'minutes').format('kk:mm:ss Z');
        }
        var dateTime = moment(date + ' ' + time, 'YYYY-MM-DD HH:mm:ss Z').toISOString();
        filter.value = dateTime;
    };
    return FilterComponent;
}());
export { FilterComponent };
FilterComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-filter',
                template: "\n    <form #form=\"ngForm\">\n      <div *ngFor=\"let filter of filters; let i = index\">\n        <div class=\"row\">\n\n          <div class=\"col-md-4 form-group\">\n            <label for=\"fieldSelect\">Field: </label><br>\n            <select\n              class=\"form-control\"\n              name=\"fieldSelect_{{i}}\"\n              [(ngModel)]=\"filter.field\"\n              required>\n              <option value=\"\">---Please select---</option>\n              <ng-template ngFor let-key [ngForOf]=\"adminService.schemaKeys\">\n                <option\n                  *ngIf=\"(schema[key].instanceOverride !== 'Hidden' ||\n                          schema[key].instanceOverride !== 'Remove') &&\n                          !schema[key].displayKey\"\n                  [value]=\"key\">\n                  {{schema[key].displayName || key}}\n                </option>\n            \n                <!-- If this is a relationship, use the displayKey -->\n                <option\n                  *ngIf=\"(schema[key].instanceOverride !== 'Hidden' ||\n                          schema[key].instanceOverride !== 'Remove') &&\n                          schema[key].displayKey\"\n                  [value]=\"key + '.' + schema[key].displayKey\">\n                  {{schema[key].displayName || key}}\n                </option>\n              </ng-template>\n            </select>\n          </div>\n\n          <div class=\"col-md-4 form-group\" *ngIf=\"filter.field\">\n            <label for=\"operatorSelect\">Operator: </label><br>\n            <!-- Select for relationship field -->\n            <select\n              class=\"form-control\"\n              name=\"operatorSelect_{{i}}\"\n              [(ngModel)]=\"filter.operator\"\n              required\n              *ngIf=\"filterService.isRelationship(filter.field)\">\n              <option value=\"\">---Please select---</option>\n              <option\n                *ngFor=\"let operator of filterService.operators[schema[filter.field.split('.')[0]].instance] || filterService.operators.String\"\n                [value]=\"operator\">\n                {{operator}}\n              </option>\n            </select>\n\n            <!-- Select for non relationship field -->\n            <select\n              class=\"form-control\"\n              name=\"operatorSelect_{{i}}\"\n              [(ngModel)]=\"filter.operator\"\n              required\n              *ngIf=\"!filterService.isRelationship(filter.field)\">\n              <option value=\"\">---Please select---</option>\n              <option\n                *ngFor=\"let operator of filterService.operators[schema[filter.field].instance] || filterService.operators.String\"\n                [value]=\"operator\">\n                {{operator}}\n              </option>\n            </select>\n          </div>\n\n          <!-- Value field for a relationship -->\n          <div *ngIf=\"filter.operator && filterService.isRelationship(filter.field)\">\n            <div\n              class=\"col-md-4 form-group\"\n              *ngIf=\"filter.field &&\n                      schema[filter.field.split('.')[0]].instance != 'Boolean' && schema[filter.field.split('.')[0]].instance != 'Date'\">\n              <label for=\"valueSelect\">Value: </label><br>\n              <input\n                class=\"form-control\"\n                name=\"filterValue_{{i}}\"\n                [(ngModel)]=\"filter.value\"\n                type=\"search\"\n                required=\"string\" />\n            </div>\n            <div\n              class=\"col-md-2 form-group\"\n              *ngIf=\"filter.field && schema[filter.field.split('.')[0]].instance === 'Date'\">\n              <label for=\"valueSelect\">Date: </label><br>\n              <input\n                class=\"form-control\"\n                name=\"filterValue_{{i}}\"\n                [(ngModel)]=\"filter.date\"\n                type=\"date\"\n                (change)=\"combineDateTime(filter)\"\n                required />\n            </div>\n            <div\n              class=\"col-md-2 form-group\"\n              *ngIf=\"filter.field && schema[filter.field.split('.')[0]].instance === 'Date'\">\n              <label for=\"valueSelect\">Time: </label><br>\n              <input\n                class=\"form-control\"\n                name=\"filterValue_{{i}}\"\n                [(ngModel)]=\"filter.time\"\n                type=\"time\"\n                (change)=\"combineDateTime(filter)\"\n                required />\n            </div>\n          </div>\n\n          <!-- Value field for non relationship field -->\n          <div *ngIf=\"filter.operator && !filterService.isRelationship(filter.field)\">\n            <div\n              class=\"col-md-4 form-group\"\n              *ngIf=\"filter.field &&\n                      schema[filter.field].instance != 'Boolean' &&\n                      schema[filter.field].instance != 'Date'\">\n              <label for=\"valueSelect\">Value: </label><br>\n              <input\n                class=\"form-control\"\n                name=\"filterValue_{{i}}\"\n                [(ngModel)]=\"filter.value\"\n                type=\"search\"\n                required=\"string\" />\n            </div>\n            <div\n              class=\"col-md-2 form-group\"\n              *ngIf=\"filter.field && schema[filter.field].instance === 'Date'\">\n              <label for=\"valueSelect\">Date: </label><br>\n              <input\n                class=\"form-control\"\n                name=\"filterValue_{{i}}\"\n                [(ngModel)]=\"filter.date\"\n                type=\"date\"\n                (change)=\"combineDateTime(filter)\"\n                required />\n            </div>\n            <div\n              class=\"col-md-2 form-group\"\n              *ngIf=\"filter.field && schema[filter.field].instance === 'Date'\">\n              <label for=\"valueSelect\">Time: </label><br>\n              <input\n                class=\"form-control\"\n                name=\"filterValue_{{i}}\"\n                [(ngModel)]=\"filter.time\"\n                type=\"time\"\n                (change)=\"combineDateTime(filter)\"\n                required />\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"pull-right\">\n        <button type=\"button\" class=\"btn btn-default\" [disabled]=\"!form.valid\" (click)=\"addFilters()\"><i class=\"fa fa-plus\"></i></button>\n        <button type=\"submit\" class=\"btn btn-default\" [disabled]=\"!form.valid\" (click)=\"findAllWithFilters()\">Filter</button>\n        <button type=\"submit\" class=\"btn btn-default\" *ngIf=\"filters.length > 1 || form.valid\" (click)=\"clearFilters()\">Clear</button>\n      </div>\n    </form>\n  ",
                styles: ["\n\n  "],
            },] },
];
FilterComponent.ctorParameters = function () { return [
    { type: AdminService, },
    { type: FilterService, },
]; };
FilterComponent.propDecorators = {
    'filters': [{ type: Input },],
    'schema': [{ type: Input },],
    'findAll': [{ type: Input },],
    'itemsPerPage': [{ type: Input },],
    'skip': [{ type: Input },],
    'sort': [{ type: Input },],
};
//# sourceMappingURL=filter.component.js.map