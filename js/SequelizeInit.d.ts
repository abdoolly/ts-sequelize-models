import { Sequelize } from "sequelize";
import { initOptions } from './interfaces/initOptions';
export declare class SequelizeInit {
    private sequelize;
    private models;
    private modelNames;
    private modelObjects;
    private options;
    private utils;
    constructor();
    static initializeModels(sequelize: Sequelize, path: string, options?: initOptions): Promise<{
        sequelize: Sequelize;
        models: any;
    }>;
    private makeModels(modelsPaths);
    private makeAssociations();
    private getSequelizeModels(path);
    private verifySequelizeObject(sequelize);
    syncModels(): Promise<void>;
}
