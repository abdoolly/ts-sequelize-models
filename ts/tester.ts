import { sequelizeModel, sequelizeInit } from './index';
import { Sequelize, DefineAttributes, DataTypes } from 'sequelize';
let seq = require('sequelize');



let config = {
    "username": "root",
    "password": null,
    "database": "test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
};

config['logging'] = false;
let ss: Sequelize = new seq(config.database, config.username, config.password, config);

sequelizeInit(ss, './js/models/', { exposeGlobal: true })
    .then(result => {
        
    })
    .catch(err => console.log(err));
