import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ConstantsService } from '../../constants.service';
var FileDropComponent = (function () {
    function FileDropComponent(formBuilder, changeDetectorRef, constants) {
        this.formBuilder = formBuilder;
        this.changeDetectorRef = changeDetectorRef;
        this.constants = constants;
        this.file = {};
        this.change = new EventEmitter();
        this.hasBaseDropZoneOver = false;
    }
    FileDropComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader = new FileUploader({
            url: this.constants.API_BASE_URL + "/aws/uploadToAws",
            autoUpload: true,
            queueLimit: 1,
        });
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
        };
        this.uploader.onProgressItem = function (item, progress) {
            _this.changeDetectorRef.detectChanges();
        };
        this.uploader.onCompleteItem = function (item, response, status) {
            _this.file = JSON.parse(response);
            _this.change.emit(_this.file);
            _this.dropDisabled = true;
        };
    };
    FileDropComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    return FileDropComponent;
}());
export { FileDropComponent };
FileDropComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-file-drop',
                template: "\n        <div ng2FileDrop\n          [uploader]=\"uploader\"\n          (fileOver)=\"fileOverBase($event)\"\n          [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver && !dropDisabled, 'disabled': dropDisabled}\"\n          class=\"well my-drop-zone\">\n          Drop file here\n        </div>\n\n      <div *ngFor=\"let item of uploader.queue\" class=\"col-sm-offset-2 col-sm-10\">\n        <div>\n          <p>{{item.file.name}}</p>\n\n          <progress-bar [progress]=item.progress></progress-bar>\n          Progress: {{item.progress}}%\n\n          <p *ngIf=\"item.isUploading\">Uploading</p>\n          <p *ngIf=\"item.isSuccess\">Uploaded</p>\n          <p *ngIf=\"item.isError\">Error</p>\n        </div>\n      </div>\n  ",
                styles: ["\n    .my-drop-zone{border:dashed 5px lightgray;width:100%;text-align:center;padding:25px 12px;line-height:auto;height:auto;cursor:pointer}.nv-file-over{border:dashed 5px green}.disabled{opacity:0.5}\n  "],
            },] },
];
FileDropComponent.ctorParameters = function () { return [
    { type: FormBuilder, },
    { type: ChangeDetectorRef, },
    { type: ConstantsService, },
]; };
FileDropComponent.propDecorators = {
    'file': [{ type: Input },],
    'change': [{ type: Output },],
};
//# sourceMappingURL=file-drop.component.js.map