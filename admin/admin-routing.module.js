import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminNewComponent } from './admin-new/admin-new.component';
var adminRoutes = [
    { path: 'admin', component: AdminLayoutComponent,
        children: [
            { path: ':className', component: AdminListComponent },
            { path: ':className/new', component: AdminNewComponent },
            { path: ':className/:id', component: AdminDetailComponent },
            { path: ':className/:id/edit', component: AdminEditComponent },
        ],
    },
];
var AdminRoutingModule = (function () {
    function AdminRoutingModule() {
    }
    return AdminRoutingModule;
}());
export { AdminRoutingModule };
AdminRoutingModule.decorators = [
    { type: NgModule, args: [{
                imports: [RouterModule.forChild(adminRoutes)],
                exports: [RouterModule],
            },] },
];
AdminRoutingModule.ctorParameters = function () { return []; };
//# sourceMappingURL=admin-routing.module.js.map