import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsComponent } from './control-errors.component';
import { ValidationService } from './validation.service';
var ControlErrorsModule = (function () {
    function ControlErrorsModule() {
    }
    return ControlErrorsModule;
}());
export { ControlErrorsModule };
ControlErrorsModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    ControlErrorsComponent,
                ],
                providers: [
                    ValidationService,
                ],
                exports: [
                    ControlErrorsComponent,
                ],
            },] },
];
ControlErrorsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=control-errors.module.js.map