import { Http } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ConstantsService } from './constants.service';
export declare class AdminService {
    private http;
    private constants;
    className: string;
    schema: any;
    schemaKeys: string[];
    tzOffsetInHours: any;
    wysiwygSettings: any;
    constructor(http: Http, constants: ConstantsService);
    loadSchema(): Promise<{}>;
    query(params?: {}): Promise<any>;
    importFromCsv(object: any): Promise<any>;
    getById(id: string): Promise<any>;
    update(object: any): Promise<any>;
    create(object: any): Promise<any>;
    delete(object: any): Promise<any>;
    deleteMultiple(objectIds: string[]): Promise<any>;
    search(className: string, search: string, field?: string, params?: any): Promise<any>;
    getKeys(object: any): string[];
    serializeParams(params: any): URLSearchParams;
}
