"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.getModelNameFromPath = function (modelPath) {
        var splitter = modelPath.split('/');
        return (splitter[splitter.length - 1]);
    };
    Utils.prototype.isClosure = function (method) {
        return typeof method === 'function';
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=utils.js.map