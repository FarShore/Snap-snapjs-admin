import { Injectable } from '@angular/core';
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.prototype.buildServerErrors = function (form, errors) {
        var serverErrors = errors.errors;
        for (var error in serverErrors) {
            if (serverErrors.hasOwnProperty(error)) {
                var split = error.split('.');
                if (split.length === 3) {
                    form.get(split[0]).get(split[1]).get(split[2]).setErrors({ server: serverErrors[error].message });
                    form.get(split[0]).setErrors({ server: serverErrors[error].message });
                }
                else {
                    if (form.get(error) && typeof form.get(error).setErrors === 'function') {
                        form.get(error).setErrors({ server: serverErrors[error].message });
                    }
                }
            }
        }
    };
    ValidationService.prototype.getValidatorErrorMessage = function (validatorName, validatorValue) {
        var validationMessages = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': "Minimum length " + validatorValue.requiredLength,
            'server': "" + (validatorValue || 'Not valid'),
        };
        return validationMessages[validatorName];
    };
    ValidationService.prototype.creditCardValidator = function (control) {
        if (control && control.value && control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { 'invalidCreditCard': true };
        }
    };
    ValidationService.prototype.emailValidator = function (control) {
        if (control && control.value && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    ValidationService.prototype.passwordValidator = function (control) {
        if (control && control.value && control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    return ValidationService;
}());
export { ValidationService };
ValidationService.decorators = [
    { type: Injectable },
];
ValidationService.ctorParameters = function () { return []; };
//# sourceMappingURL=validation.service.js.map