import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import * as _ from 'lodash';
import 'rxjs/add/operator/toPromise';
import { ConstantsService } from './constants.service';
var AdminService = (function () {
    function AdminService(http, constants) {
        this.http = http;
        this.constants = constants;
        var today = new Date();
        this.tzOffsetInHours = -today.getTimezoneOffset() / 60;
        this.wysiwygSettings = this.constants.ADMIN_WYSIWYG_OPTIONS;
    }
    AdminService.prototype.loadSchema = function () {
        var _this = this;
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className + "/schema";
        return this.http.get(queryUrl)
            .toPromise()
            .then(function (response) {
            _this.schema = response.json();
            _this.schema = _.merge(_this.schema, _this.constants.DEFAULT_SCHEMA_OVERWRITES[_this.className]);
            _this.schemaKeys = Object.keys(_this.schema);
            return _this.schema;
        });
    };
    AdminService.prototype.query = function (params) {
        if (params === void 0) { params = {}; }
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className + "?";
        queryUrl += this.serializeParams(params).toString();
        return this.http.get(queryUrl)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    AdminService.prototype.importFromCsv = function (object) {
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className + "/importFromCsv";
        return this.http.post(queryUrl, object)
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    AdminService.prototype.getById = function (id) {
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className + "/" + id;
        return this.http.get(queryUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    AdminService.prototype.update = function (object) {
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className + "/" + object._id;
        return this.http.put(queryUrl, object)
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    AdminService.prototype.create = function (object) {
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className;
        return this.http.post(queryUrl, object)
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    AdminService.prototype.delete = function (object) {
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className + "/" + object._id;
        return this.http.delete(queryUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    AdminService.prototype.deleteMultiple = function (objectIds) {
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + this.className + "/deleteMultiple";
        return this.http.post(queryUrl, { ids: objectIds })
            .toPromise()
            .then(function (response) {
            return response.json();
        });
    };
    AdminService.prototype.search = function (className, search, field, params) {
        if (field === void 0) { field = 'name'; }
        if (params === void 0) { params = { limit: 10 }; }
        var queryUrl = this.constants.API_BASE_URL + "/admin/" + className;
        queryUrl += "?" + this.serializeParams(params).toString();
        queryUrl += "&filters[0][field]=" + field + "&filters[0][operator]=like&filters[0][value]=" + search;
        return this.http.get(queryUrl)
            .toPromise()
            .then(function (response) { return response.json(); });
    };
    AdminService.prototype.getKeys = function (object) {
        return Object.keys(object);
    };
    AdminService.prototype.serializeParams = function (params) {
        var serializedParams = new URLSearchParams();
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                serializedParams.set(key, params[key]);
            }
        }
        return serializedParams;
    };
    return AdminService;
}());
export { AdminService };
AdminService.decorators = [
    { type: Injectable },
];
AdminService.ctorParameters = function () { return [
    { type: Http, },
    { type: ConstantsService, },
]; };
//# sourceMappingURL=admin.service.js.map