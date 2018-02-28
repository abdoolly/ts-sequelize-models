"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var SequelizeModel = (function () {
    function SequelizeModel() {
        this.modelName = null;
        this.model = null;
        this.utils = new utils_1.Utils();
    }
    SequelizeModel.prototype.initializeModel = function (sequelize, DataTypes, modelsExtenders) {
        var options = this.getOptions();
        var hooks = this.mergeHooks(this.getHooks(), options.hooks);
        options.hooks = hooks;
        this.model = sequelize.define(this.getModelName(), this.getAttributes(DataTypes), options);
        this.modelAction(this.model);
        this.putExtendsInModel(modelsExtenders);
        return this.model;
    };
    SequelizeModel.prototype.getOptions = function () {
        return {};
    };
    SequelizeModel.prototype.getModelName = function () {
        if (this.modelName)
            return this.modelName;
        return this.modelName = Object.getPrototypeOf(this).constructor.name;
    };
    SequelizeModel.prototype.associate = function (models, currentModel) {
        return this.notImplemented();
    };
    SequelizeModel.prototype.getHooks = function () {
        var _this = this;
        var methods = Object.keys(Object.getPrototypeOf(this));
        var hooksObject = {};
        var implementedHooks = methods.filter(function (method) {
            var filterStatus = (method.indexOf('before') != -1 || method.indexOf('after') != -1) && (typeof _this[method]() !== 'string');
            if (filterStatus) {
                var hookClosure = _this[method]();
                if (!_this.utils.isClosure(hookClosure))
                    throw Error("Hook " + method + " in model " + _this.getModelName() + " does not return a closure, Please make sure you return the hook closure");
                hooksObject[method] = hookClosure;
            }
            return filterStatus;
        });
        return hooksObject;
    };
    SequelizeModel.prototype.putExtendsInModel = function (modelsExtenders) {
        var _this = this;
        if (modelsExtenders === void 0) { modelsExtenders = []; }
        var model = this.model;
        if (!model)
            throw Error('You cannot extend an unintialized model');
        var extendedClosures = this.extendModel();
        if (!Array.isArray(extendedClosures))
            throw Error('extendModel function should return an array of strings or functions');
        modelsExtenders = modelsExtenders || [];
        extendedClosures = extendedClosures.concat(modelsExtenders);
        extendedClosures.forEach(function (closure) {
            if (!_this.utils.isClosure(closure) && typeof closure !== 'string')
                throw Error("Paramter " + closure + " is not a function or a string");
            if (typeof closure === 'string' && !_this.utils.isClosure(_this[closure]))
                throw Error("Function name " + closure + " does not exist in class or is not a function");
            if (!Array.isArray(closure) && typeof closure === 'object' && !(closure.name) && !(closure.value))
                throw Error("Object " + closure + " should have properties name and value");
            if (!Array.isArray(closure) && typeof closure === 'object')
                model[closure.name] = closure.value;
            if (typeof closure === 'string' && _this.utils.isClosure(_this[closure]))
                model[closure] = _this[closure];
            if (_this.utils.isClosure(closure))
                model[closure.name] = closure;
        });
    };
    SequelizeModel.prototype.mergeHooks = function (methodHooks, optionHooks) {
        if (optionHooks)
            return Object.assign({}, methodHooks, optionHooks);
        return methodHooks;
    };
    SequelizeModel.prototype.extendModel = function () {
        return [];
    };
    SequelizeModel.prototype.modelAction = function (model) {
        return this.notImplemented();
    };
    SequelizeModel.prototype.beforeValidate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterValidate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeCreate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterCreate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeDestroy = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeDelete = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterDestroy = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterDelete = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeUpdate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterUpdate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeBulkCreate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterBulkCreate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeBulkDestroy = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeBulkDelete = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterBulkDestroy = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterBulkDelete = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeBulkUpdate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterBulkUpdate = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeFind = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeFindAfterExpandIncludeAll = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.beforeFindAfterOptions = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.afterFind = function () { return this.notImplemented(); };
    ;
    SequelizeModel.prototype.notImplemented = function () {
        return 'not implemented';
    };
    return SequelizeModel;
}());
exports.SequelizeModel = SequelizeModel;
//# sourceMappingURL=SequelizeModel.js.map