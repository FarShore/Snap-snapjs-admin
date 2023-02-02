import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ConstantsService } from '../../constants.service';
var FormControlFileUploadComponent = (function () {
    function FormControlFileUploadComponent(formBuilder, changeDetectorRef, constants) {
        this.formBuilder = formBuilder;
        this.changeDetectorRef = changeDetectorRef;
        this.constants = constants;
        this.files = [];
        this.directUpload = false;
    }
    FormControlFileUploadComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isSubmitting = false;
        this.uploader = new FileUploader({
            url: this.constants.API_BASE_URL + "/aws/uploadToAws",
            method: 'PUT',
            allowedMimeType: this.allowedMimeType ||
                this.constants.FILE_UPLOAD_DEFAULT_ALLOWED_MIME_TYPES,
            maxFileSize: this.maxFileSize || this.constants.FILE_UPLOAD_DEFAULT_MAX_FILE_SIZE,
        });
        this.uploader.onAfterAddingFile = function (file) {
            if (file.file.size > 100000000) {
                _this.directUpload = true;
            }
            file.withCredentials = false;
        };
        this.uploader.onProgressItem = function (item, progress) {
            _this.changeDetectorRef.detectChanges();
        };
        this.uploader.onCompleteItem = function (item, response, status) {
            _this.isSubmitting = false;
            if (_this.directUpload) {
                var fileObject = {
                    name: item.file.name,
                    type: item.file.type,
                    size: item.file.size,
                    url: item.url
                };
                _this.form.get(_this.field).setValue(fileObject);
            }
            else {
                var file = JSON.parse(response);
                if (_this.isMultiple) {
                    _this.addItem(file);
                }
                else {
                    _this.form.get(_this.field).setValue(file);
                }
            }
        };
        this.uploader.onWhenAddingFileFailed = function (item, filter, options) {
            console.error('File error:', item, filter, options);
            _this.isSubmitting = false;
            switch (filter.name) {
                case 'mimeType':
                    var allowedMimeTypes = _this.allowedMimeType.join(', ');
                    _this.errorMessage =
                        "That file is the wrong type. Accepted file types are " + allowedMimeTypes;
                    break;
                case 'fileSize':
                    _this.errorMessage = 'That file is too big.';
                    break;
                default:
                    _this.errorMessage = 'That file cannot be uploaded.';
                    break;
            }
        };
        if (this.object[this.field]) {
            if (this.object[this.field].constructor === Array) {
                this.object[this.field].forEach(function (item) {
                    _this.addItem(item);
                });
            }
        }
    };
    FormControlFileUploadComponent.prototype.upload = function () {
        this.isSubmitting = true;
        if (this.directUpload) {
            this.getSignedRequest(this.uploader.getNotUploadedItems()[0]);
        }
        else {
            this.uploader.uploadAll();
        }
    };
    FormControlFileUploadComponent.prototype.getSignedRequest = function (fileLikeObject) {
        var _this = this;
        fileLikeObject.file.name = fileLikeObject.file.name
            .replace(/[^a-zA-Z0-9. ]/g, '')
            .replace(/\s+/g, ' ')
            .replace(/[ ]/g, '-');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "/api/aws/s3Signature?fileName=" + fileLikeObject.file.name + "&fileType=" + fileLikeObject.file.type);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    _this.uploadFile(fileLikeObject, response.s3Signature, response.url);
                }
                else {
                    alert('Could not get signed URL.');
                }
            }
        };
        xhr.send();
    };
    FormControlFileUploadComponent.prototype.uploadFile = function (fileLikeObject, s3Signature, url) {
        this.uploader.setOptions({
            disableMultipart: true,
            url: s3Signature,
            allowedMimeType: this.allowedMimeType ||
                this.constants.FILE_UPLOAD_DEFAULT_ALLOWED_MIME_TYPES,
            maxFileSize: this.maxFileSize || this.constants.FILE_UPLOAD_DEFAULT_MAX_FILE_SIZE,
        });
        this.uploader.uploadAll();
        fileLikeObject.url = url;
    };
    FormControlFileUploadComponent.prototype.addItem = function (item) {
        if (item === void 0) { item = {}; }
        var control = this.form.get(this.field);
        control.push(this.initItem(item));
    };
    FormControlFileUploadComponent.prototype.initItem = function (item) {
        if (item === void 0) { item = {}; }
        var formGroup = this.formBuilder.group({});
        var fileKeys = Object.keys(item);
        fileKeys.forEach(function (key) {
            formGroup.registerControl(key, new FormControl(item[key] || ''));
        });
        return formGroup;
    };
    FormControlFileUploadComponent.prototype.removeItem = function (i) {
        var control = this.form.get(this.field);
        control.removeAt(i);
    };
    FormControlFileUploadComponent.prototype.isImage = function (mimeType) {
        return this.constants.IMAGE_MIME_TYPES.indexOf(mimeType) >= 0;
    };
    return FormControlFileUploadComponent;
}());
export { FormControlFileUploadComponent };
FormControlFileUploadComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-file-upload',
                template: "\n    <div [formGroup]=\"form\" class=\"row\">\n\n      <!-- Images -->\n      <div *ngIf=\"!isMultiple\">\n        <label class=\"col-sm-2 control-label\">{{displayName}}:</label>\n\n        <div *ngIf=\"form.controls[field].value\">\n          <div *ngIf=\"form.controls[field].value.url\">\n            <img *ngIf=\"isImage(form.controls[field].value.type)\" src=\"{{constants.AWS_S3_BASE_URL}}/{{form.controls[field].value.url}}\"\n              style=\"max-width: 200px; max-height: 200px;\">\n            <a *ngIf=\"!isImage(form.controls[field].value.type)\" href=\"{{constants.AWS_S3_BASE_URL}}/{{form.controls[field].value.url}}\"\n              target=\"_blank\">{{form.controls[field].value.name}}</a>\n          </div>\n        </div>\n\n        <div class=\"col-sm-offset-2 col-sm-10\" *ngIf=\"!form.controls[field].disabled\">\n          <span *ngIf=\"form.value[field].name\" (click)=\"form.value[field] = {}\">Remove</span>\n        </div>\n      </div>\n\n      <!-- Multiple images -->\n      <div *ngIf=\"isMultiple\">\n        <div [formArrayName]=\"field\">\n          <label for=\"name\" class=\"col-sm-2 control-label\">{{field}}:</label>\n          <div *ngIf=\"form.controls[field]\" class=\"col-sm-10\">\n            <div *ngFor=\"let item of form.controls[field].controls; let i = index; \">\n              <div *ngIf=\"item.controls.url\">\n                <img *ngIf=\"isImage(item.controls.type.value)\" src=\"{{constants.AWS_S3_BASE_URL}}/{{item.controls.url.value}}\"\n                  style=\"max-width: 200px; max-height: 200px;\">\n                <a *ngIf=\"!isImage(item.controls.type.value)\" href=\"{{constants.AWS_S3_BASE_URL}}/{{item.controls.url.value}}\"\n                  target=\"_blank\">{{item.controls.name.value}}</a>\n\n                <!-- Remove -->\n                <p (click)=\"removeItem(i, field)\">Remove</p>\n              </div>\n              <div [formGroupName]=\"i\"></div>\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!-- Upload form -->\n      <div class=\"col-sm-offset-2 col-sm-10\" *ngIf=\"!form.controls[field].disabled\">\n        <input type=\"file\" ng2FileSelect [uploader]=\"uploader\" multiple=\"isMultiple\" />\n        <p *ngIf=\"errorMessage\">{{errorMessage}}</p>\n      </div>\n\n      <!-- Display uploaded image and progress -->\n      <div *ngFor=\"let item of uploader.queue\" class=\"col-sm-offset-2 col-sm-10\">\n        <div *ngIf=\"!item.isSuccess\">\n          <p>{{item.file.name}}</p>\n\n          <progress-bar [progress]=item.progress></progress-bar>\n          Progress: {{item.progress}}%\n\n          <p *ngIf=\"item.isUploading\">Uploading</p>\n          <p *ngIf=\"item.isSuccess\">Uploaded</p>\n          <p *ngIf=\"item.isError\">Error</p>\n        </div>\n      </div>\n\n      <!-- Upload button -->\n      <div class=\"col-sm-offset-2 col-sm-10\" *ngIf=\"!form.controls[field].disabled\">\n        <button type=\"button\" class=\"btn btn-success btn-s\" (click)=\"upload()\" [disabled]=\"isSubmitting || !uploader.getNotUploadedItems().length\">\n          <span class=\"glyphicon glyphicon-upload\"></span> Upload\n        </button>\n      </div>\n\n    </div>\n  ",
                styles: ["\n    .my-drop-zone{border:dotted 3px lightgray}.nv-file-over{border:dotted 3px red}\n  "],
            },] },
];
FormControlFileUploadComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
    { type: ChangeDetectorRef, },
    { type: ConstantsService, },
]; };
FormControlFileUploadComponent.propDecorators = {
    'isMultiple': [{ type: Input },],
    'form': [{ type: Input },],
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
    'object': [{ type: Input },],
    'allowedMimeType': [{ type: Input },],
    'maxFileSize': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-file-upload.component.js.map