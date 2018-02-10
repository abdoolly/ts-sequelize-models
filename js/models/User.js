"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var User = (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    User.prototype.getAttributes = function (DataTypes) {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING
        };
    };
    User.prototype.getOptions = function () {
        return {
            hooks: {
                beforeCreate: function (user, options) { return console.log('am in'); }
            }
        };
    };
    User.prototype.afterCreate = function () {
        return function (user, options) {
            console.log('i am in AfterCreation');
        };
    };
    ;
    return User;
}(index_1.sequelizeModel));
exports.User = User;
//# sourceMappingURL=User.js.map