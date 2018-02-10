import { sequelizeModel } from '../index';
import { DataTypes, DefineAttributes, DefineOptions } from 'sequelize';
export declare class User extends sequelizeModel {
    getAttributes(DataTypes: DataTypes): DefineAttributes;
    getOptions(): DefineOptions<any>;
    afterCreate(): any;
}
