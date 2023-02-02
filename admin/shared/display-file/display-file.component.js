import { Component, Input } from '@angular/core';
import { ConstantsService } from '../../constants.service';
var DisplayFileComponent = (function () {
    function DisplayFileComponent(constants) {
        this.constants = constants;
    }
    DisplayFileComponent.prototype.isImage = function (mimeType) {
        return this.constants.IMAGE_MIME_TYPES.indexOf(mimeType) >= 0;
    };
    return DisplayFileComponent;
}());
export { DisplayFileComponent };
DisplayFileComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-display-file',
                template: "\n    <div class=\"col-sm-11\">\n      <div *ngFor=\"let file of files\">\n        <div *ngIf=\"isImage(file.type)\" class=\"array-img\">\n          <img *ngIf=\"file.styles\" src=\"{{constants.AWS_S3_BASE_URL}}/{{file.styles.thumb_square}}\" style=\"width: 100%\">\n          <img *ngIf=\"!file.styles\" src=\"{{constants.AWS_S3_BASE_URL}}/{{file.url}}\" style=\"width: 100%\">\n        </div>\n\n        <div *ngIf=\"!isImage(file.type)\">\n          <span *ngIf=\"file.name && file.url\" class=\"text-wordwrap\"><strong>Name:</strong> <a href=\"{{constants.AWS_S3_BASE_URL}}/{{file.url}}\"\n              target=\"_blank\">{{file.name}}</a></span>\n          <br>\n          <span *ngIf=\"file.type\" class=\"text-wordwrap\"><strong>Type:</strong> {{file.type}}</span>\n          <br>\n          <span *ngIf=\"file.size\" class=\"text-wordwrap\"><strong>size: </strong> {{file.size}}</span>\n          <br>\n          <br>\n          <span *ngIf=\"file.status\" class=\"text-wordwrap\"><strong>status: </strong> {{file.status}}</span>\n        </div>\n      </div>\n    </div>\n  ",
                styles: ["\n    .array-img{display:inline-block;width:85px;height:85px;overflow:hidden;margin-right:5px}\n  "],
            },] },
];
DisplayFileComponent.ctorParameters = function () { return [
    { type: ConstantsService, },
]; };
DisplayFileComponent.propDecorators = {
    'files': [{ type: Input },],
};
//# sourceMappingURL=display-file.component.js.map