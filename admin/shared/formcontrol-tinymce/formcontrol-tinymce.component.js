var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import { Component, Input } from '@angular/core';
import { AdminService } from './../../admin.service';
var FormcontrolTinymceComponent = (function () {
    function FormcontrolTinymceComponent(adminService) {
        this.adminService = adminService;
    }
    FormcontrolTinymceComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        tinyMCE.baseURL = '/assets/tinymce/';
        var initOptions = {
            selector: "#tinymce-" + this.field,
            menubar: false,
            plugins: ['link', 'paste', 'lists', 'advlist'],
            toolbar: 'styleselect | bold italic underline | alignleft aligncenter alignright | bullist numlist outdent indent | link image',
            setup: function (editor) {
                _this.editor = editor;
                editor.on('keyup', function () {
                    var content = editor.getContent();
                    _this.form.get(_this.field).patchValue(content);
                });
                editor.on('blur', function () {
                    var content = editor.getContent();
                    _this.form.get(_this.field).patchValue(content);
                });
            },
        };
        initOptions = __assign({}, initOptions, this.adminService.wysiwygSettings);
        tinymce.init(initOptions);
    };
    FormcontrolTinymceComponent.prototype.ngOnDestroy = function () {
        tinymce.remove(this.editor);
    };
    return FormcontrolTinymceComponent;
}());
export { FormcontrolTinymceComponent };
FormcontrolTinymceComponent.decorators = [
    { type: Component, args: [{
                selector: 'app-formcontrol-tinymce',
                template: "\n    <div [formGroup]=\"form\" class=\"form-group\">\n      <label class=\"col-sm-2 control-label\">{{displayName}}</label>\n      <div class=\"col-sm-10\">\n        <textarea id=\"tinymce-{{field}}\" [formControlName]=\"field\" class=\"form-control\"></textarea>\n      </div>\n    </div>\n  ",
                styles: ["\n\n  "],
            },] },
];
FormcontrolTinymceComponent.ctorParameters = function () { return [
    { type: AdminService, },
]; };
FormcontrolTinymceComponent.propDecorators = {
    'field': [{ type: Input },],
    'displayName': [{ type: Input },],
    'form': [{ type: Input },],
};
//# sourceMappingURL=formcontrol-tinymce.component.js.map