import { Sequelize, Model } from "sequelize";
let seq = require('sequelize');
import * as bluebird from "bluebird";
import { sequelizeModel } from "./index";
let glob = require('glob');
import { resolve, normalize } from 'path';
import { Utils } from "./utils";
import { initOptions } from './interfaces/initOptions';

export class SequelizeInit {

    private sequelize: Sequelize = null;
    private models: any = {};
    private modelNames: string[] = null;
    private modelObjects = {};
    private options: initOptions = {};


    private utils: Utils;

    constructor() {
        this.utils = new Utils();
    }

    /**
     * @description intialize models for you and optionally sync with force : false
     * 
     * @param sequelize 
     * @param path 
     * @param options 
     * @returns Promise<{sequelize,models}>
     */
    static async initializeModels(sequelize: Sequelize, path: string, options?: initOptions) {
        let self = new SequelizeInit();
        self.options = options || {};

        self.verifySequelizeObject(sequelize);
        self.modelNames = await self.getSequelizeModels(path);
        self.makeModels(self.modelNames);
        self.makeAssociations();
        await self.syncModels();
        return {
            sequelize: self.sequelize,
            models: self.models
        };
    }

    private makeModels(modelsPaths: string[]) {
        // looping on all found models and creating them 
        for (let modelPath of modelsPaths) {
            // removing extension from the path
            modelPath = modelPath.slice(0, modelPath.length - 3);

            // requiring the model
            let modelClass = require(modelPath);

            // getting the model name 
            let modelName = this.utils.getModelNameFromPath(modelPath);

            let modelObject: sequelizeModel;
            try {
                // making a new object from the class 
                modelObject = new modelClass[modelName]();
            } catch (err) {
                console.log(`Model ${modelName} has a problem check the below error`);
                throw err;
            }

            // checking if the models that is initiated is an instance of the sequelizeModel class
            if (!(modelObject instanceof sequelizeModel))
                throw Error(`class ${modelName} does not extend sequelizeModel`);

            // saving the new class in the modelObjects for using it later
            this.modelObjects[modelName] = modelObject;

            // calling the initialize object which defines the model
            this.models[modelName] = modelObject.initializeModel(this.sequelize, seq.DataTypes);
        }
        return this.models;
    }

    /**
     * @description apply the associations in the models
     */
    private makeAssociations() {
        let modelNames = Object.keys(this.modelObjects);

        for (let modelName of modelNames) {
            this.modelObjects[modelName].associate(this.models, this.models[modelName]);

            if (this.options.exposeGlobal)
                global[modelName] = this.models[modelName];
        }
    }

    /**
     * @description get sequelize models full paths in a directory recursively
     * @param path 
     */
    private async getSequelizeModels(path: string): Promise<string[]> {
        try {
            let globAsync: any = bluebird.promisify(glob);

            // resolving path
            let modelsPath = resolve(`${path}/**/*.js`);
            // getting all model paths in the folder recursively
            let models: string[] = await globAsync(modelsPath);

            // checking if no models came throwing an error that either the path is wrong or no models found
            if (!models.length)
                throw Error(`No models found in path ${modelsPath}`);

            return models;
        } catch (err) {
            throw err;
        }
    }

    /**
     * @description function to verify that sequelize object passed is intialized
     * @param sequelize 
     */
    private verifySequelizeObject(sequelize: Sequelize) {
        // verifying that the sequelize object given is an object of sequelize that has
        // been initialized otherwise through an error
        if (Object.getPrototypeOf(sequelize).constructor.name !== 'Sequelize')
            throw Error('Please initialize the sequelize object before passing it');

        this.sequelize = sequelize;
    }

    /**
     * @description function to see the sync options and by default sync with force : false
     */
    async syncModels() {
        if (this.options.sync === undefined || (typeof this.options.sync === 'boolean' && this.options.sync === true))
            await this.sequelize.sync({ force: false });

        if (typeof this.options.sync === 'object') {
            this.options.sync.force = this.options.sync.force === undefined ? false : this.options.sync.force;
            await this.sequelize.sync(this.options.sync);
        }
    }

}