import { Component, Input } from '@angular/core';
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
    }
    return ProgressBarComponent;
}());
export { ProgressBarComponent };
ProgressBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'progress-bar',
                template: "\n    <div class=\"progress-outer\">\n      <div class=\"progress-inner\" [style.width]=\"progress + '%'\">\n      \t<p>{{progress}}%</p>\n      </div>\n    </div>\n  ",
                styles: ["\n    .progress-outer{display:flex;width:30%;height:19px;margin-bottom:10px;padding:4px;text-align:center;background-color:#f4f4f4;border:1px solid #dcdcdc;color:#fff;border-radius:20px}.progress-inner{min-width:15%;white-space:nowrap;overflow:hidden;border-radius:20px;background-color:#1C61B5}.progress-inner p{font-size:0.5em}\n  "],
            },] },
];
ProgressBarComponent.ctorParameters = function () { return []; };
ProgressBarComponent.propDecorators = {
    'progress': [{ type: Input },],
};
//# sourceMappingURL=progress-bar.component.js.map