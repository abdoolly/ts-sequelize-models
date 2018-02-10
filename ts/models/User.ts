import { sequelizeModel } from '../index';
import { DataTypes, DefineAttributes, DefineOptions, Model } from 'sequelize';

export class User extends sequelizeModel {

    getAttributes(DataTypes: DataTypes): DefineAttributes {
        return {
            first_name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: { type: DataTypes.STRING, unique: true },
            password: DataTypes.STRING
        };
    }

    getOptions(): DefineOptions<any> {
        return {
            hooks: {
                beforeCreate: (user, options) => console.log('am in')
            }
        };
    }

    afterCreate(): any {
        return (user, options) => {
            console.log('i am in AfterCreation');
        };
    };

}