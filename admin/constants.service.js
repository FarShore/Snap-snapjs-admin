import { Injectable } from '@angular/core';
var ConstantsService = (function () {
    function ConstantsService() {
        this.API_BASE_URL = 'http://localhost:3000/api';
        this.AWS_S3_BASE_URL = '';
        this.FILE_UPLOAD_DEFAULT_ALLOWED_MIME_TYPES = [
            'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'text/plain', 'text/csv', 'audio/mpeg', 'video/mp4',
        ];
        this.FILE_UPLOAD_DEFAULT_MAX_FILE_SIZE = 10000000;
        this.IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        this.SIDEBAR_ITEMS = [
            {
                title: 'Users',
                icon: 'users',
                class: 'User',
            },
            {
                title: 'Companies',
                icon: 'mobile',
                class: 'Company',
            },
        ];
        this.DEFAULT_SCHEMA_OVERWRITES = {
            Company: {
                roles: {
                    instance: 'MultiSelect',
                    options: ['admin', 'manager', 'user', 'employee'],
                },
                singleRole: {
                    instance: 'SingleSelect',
                    options: ['admin', 'manager', 'user', 'super admin', 'intern'],
                },
                overview: {
                    instance: 'Wysiwyg',
                },
                __v: {
                    instance: 'Remove',
                },
                _id: {
                    instance: 'Hidden',
                },
                createdAt: {
                    instance: 'Disabled',
                },
                updatedAt: {
                    instance: 'Disabled',
                },
                avatar: {
                    instance: 'Image',
                },
                images: {
                    instance: 'ImageArray',
                    allowedMimeType: ['image/jpeg', 'image/jpg', 'image/png'],
                },
                file: {
                    instance: 'File',
                },
                files: {
                    instance: 'FileArray',
                },
                _createdBy: {
                    searchField: 'firstName',
                },
                _locations: {
                    searchField: 'name',
                },
                _relationship: {
                    searchField: 'name',
                },
            },
            User: {
                avatar: {
                    instance: 'Image',
                    allowedMimeType: ['image/jpeg', 'image/jpg', 'image/png'],
                },
            },
        };
        this.ADMIN_WYSIWYG_OPTIONS = {};
    }
    return ConstantsService;
}());
export { ConstantsService };
ConstantsService.decorators = [
    { type: Injectable },
];
ConstantsService.ctorParameters = function () { return []; };
//# sourceMappingURL=constants.service.js.map