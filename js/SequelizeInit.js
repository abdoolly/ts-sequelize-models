"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var seq = require('sequelize');
var bluebird = require("bluebird");
var index_1 = require("./index");
var glob = require('glob');
var path_1 = require("path");
var utils_1 = require("./utils");
var SequelizeInit = (function () {
    function SequelizeInit() {
        this.sequelize = null;
        this.models = {};
        this.modelNames = null;
        this.modelObjects = {};
        this.options = {};
        this.utils = new utils_1.Utils();
    }
    SequelizeInit.initializeModels = function (sequelize, path, options) {
        return __awaiter(this, void 0, void 0, function () {
            var self, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        self = new SequelizeInit();
                        self.options = options || {};
                        self.verifySequelizeObject(sequelize);
                        _a = self;
                        return [4, self.getSequelizeModels(path)];
                    case 1:
                        _a.modelNames = _b.sent();
                        self.makeModels(self.modelNames);
                        self.makeAssociations();
                        return [4, self.syncModels()];
                    case 2:
                        _b.sent();
                        return [2, {
                                sequelize: self.sequelize,
                                models: self.models
                            }];
                }
            });
        });
    };
    SequelizeInit.prototype.makeModels = function (modelsPaths) {
        for (var _i = 0, modelsPaths_1 = modelsPaths; _i < modelsPaths_1.length; _i++) {
            var modelPath = modelsPaths_1[_i];
            modelPath = modelPath.slice(0, modelPath.length - 3);
            var modelClass = require(modelPath);
            var modelName = this.utils.getModelNameFromPath(modelPath);
            var modelObject = void 0;
            try {
                modelObject = new modelClass[modelName]();
            }
            catch (err) {
                console.log("Model " + modelName + " has a problem check the below error");
                throw err;
            }
            if (!(modelObject instanceof index_1.sequelizeModel))
                throw Error("class " + modelName + " does not extend sequelizeModel");
            this.modelObjects[modelName] = modelObject;
            this.models[modelName] = modelObject.initializeModel(this.sequelize, seq.DataTypes);
        }
        return this.models;
    };
    SequelizeInit.prototype.makeAssociations = function () {
        var modelNames = Object.keys(this.modelObjects);
        for (var _i = 0, modelNames_1 = modelNames; _i < modelNames_1.length; _i++) {
            var modelName = modelNames_1[_i];
            this.modelObjects[modelName].associate(this.models, this.models[modelName]);
            if (this.options.exposeGlobal)
                global[modelName] = this.models[modelName];
        }
    };
    SequelizeInit.prototype.getSequelizeModels = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var globAsync, modelsPath, models, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        globAsync = bluebird.promisify(glob);
                        modelsPath = path_1.resolve(path + "/**/*.js");
                        return [4, globAsync(modelsPath)];
                    case 1:
                        models = _a.sent();
                        if (!models.length)
                            throw Error("No models found in path " + modelsPath);
                        return [2, models];
                    case 2:
                        err_1 = _a.sent();
                        throw err_1;
                    case 3: return [2];
                }
            });
        });
    };
    SequelizeInit.prototype.verifySequelizeObject = function (sequelize) {
        if (Object.getPrototypeOf(sequelize).constructor.name !== 'Sequelize')
            throw Error('Please initialize the sequelize object before passing it');
        this.sequelize = sequelize;
    };
    SequelizeInit.prototype.syncModels = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.options.sync === undefined || (typeof this.options.sync === 'boolean' && this.options.sync === true))) return [3, 2];
                        return [4, this.sequelize.sync({ force: false })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(typeof this.options.sync === 'object')) return [3, 4];
                        this.options.sync.force = this.options.sync.force === undefined ? false : this.options.sync.force;
                        return [4, this.sequelize.sync(this.options.sync)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    return SequelizeInit;
}());
exports.SequelizeInit = SequelizeInit;
//# sourceMappingURL=SequelizeInit.js.map