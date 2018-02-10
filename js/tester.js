"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var seq = require('sequelize');
var config = {
    "username": "root",
    "password": null,
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
};
config['logging'] = false;
var ss = new seq(config.database, config.username, config.password, config);
index_1.sequelizeInit(ss, './js/models/', { exposeGlobal: true })
    .then(function (result) {
})
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=tester.js.map