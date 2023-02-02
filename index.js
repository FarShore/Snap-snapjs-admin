import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnapJSAdminModule } from './admin/admin.module';
export * from './admin/admin.module';
var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule.forRoot = function () {
        return {
            ngModule: AdminModule,
            providers: []
        };
    };
    return AdminModule;
}());
export { AdminModule };
AdminModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                    SnapJSAdminModule
                ],
                declarations: [],
                exports: []
            },] },
];
AdminModule.ctorParameters = function () { return []; };
//# sourceMappingURL=index.js.map