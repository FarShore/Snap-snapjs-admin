import { OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { AdminService } from '../admin.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ConstantsService } from '../constants.service';
export declare class AdminListComponent implements OnInit {
    private router;
    private route;
    adminService: AdminService;
    private toastr;
    private vRef;
    private constants;
    private changeDetectorRef;
    objects: any;
    totalObjects: Number;
    params: any;
    itemsPerPage: number;
    currentPage: number;
    selectAll: boolean;
    selectedItems: any[];
    filterToggle: boolean;
    toggle: any;
    form: FormGroup;
    uploadedFile: '';
    importLoading: boolean;
    importToggle: boolean;
    filters: any[];
    filterFunction: Function;
    constructor(router: Router, route: ActivatedRoute, adminService: AdminService, toastr: ToastsManager, vRef: ViewContainerRef, constants: ConstantsService, changeDetectorRef: ChangeDetectorRef);
    ngOnInit(): void;
    findAll(params?: any): void;
    pageChanged(): void;
    deleteItem(object: any): void;
    deleteMultiple(objectIds: string[]): void;
    clearSelections(): void;
    toggleAllSelection(): void;
    toggleSelection(objectId: string): void;
    updateSort(key: string): void;
    exportToCsv(): void;
    updateFile(event: any): void;
    toggleImport(): void;
    importFromCsv(): void;
    cancelImport(): void;
    resetFilters(): void;
    buildServerErrors(error: any): string;
}
