import { Injectable } from '@angular/core';
var FilterService = (function () {
    function FilterService() {
        this.operators = {
            String: ['equals', 'not equal', 'like'],
            Number: ['equals', 'not equal', 'less than', 'greater than',
                'less than or equal to', 'greater than or equal to'],
            Boolean: ['true', 'false'],
            Date: ['less than', 'greater than', 'less than or equal to', 'greater than or equal to'],
            ObjectID: ['equals', 'not equal', 'like'],
            Image: ['equals', 'not equal', 'like'],
            Array: ['equals', 'not equal', 'like']
        };
    }
    FilterService.prototype.buildQuery = function (filters, itemsPerPage, skip, sort) {
        var query = { limit: itemsPerPage, skip: skip, sort: sort };
        filters.forEach(function (filter, index) {
            query["filters[" + index + "][field]"] = filter.field;
            query["filters[" + index + "][operator]"] = filter.operator;
            query["filters[" + index + "][value]"] = filter.value;
        });
        return query;
    };
    FilterService.prototype.buildFilter = function (field, operator, value) {
        return { field: field, operator: operator, value: value };
    };
    FilterService.prototype.isRelationship = function (field) {
        return field.includes('.') ? true : false;
    };
    return FilterService;
}());
export { FilterService };
FilterService.decorators = [
    { type: Injectable },
];
FilterService.ctorParameters = function () { return []; };
//# sourceMappingURL=filter.service.js.map