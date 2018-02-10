"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SequelizeModel = (function () {
    function SequelizeModel() {
        this.modelName = null;
        this.model = null;
    }
    SequelizeModel.prototype.initializeModel = function (sequelize, DataTypes) {
        var options = this.getOptions();
        var hooks = this.mergeHooks(this.getHooks(), options.hooks);
        options.hooks = hooks;
        this.model = sequelize.define(this.getModelName(), this.getAttributes(DataTypes), options);
        this.modelAction(this.model);
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
            if (filterStatus)
                hooksObject[method] = _this[method]();
            return filterStatus;
        });
        return hooksObject;
    };
    SequelizeModel.prototype.mergeHooks = function (methodHooks, optionHooks) {
        if (optionHooks)
            return Object.assign({}, methodHooks, optionHooks);
        return methodHooks;
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