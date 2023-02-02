import { OnDestroy, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AdminService } from './../../admin.service';
export declare class FormcontrolTinymceComponent implements AfterViewInit, OnDestroy {
    private adminService;
    field: string;
    displayName: string;
    form: FormGroup;
    editor: any;
    constructor(adminService: AdminService);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
}
