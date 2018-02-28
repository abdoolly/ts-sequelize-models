import { Sequelize, DefineAttributes, DataTypes, Model, DefineOptions } from 'sequelize';
import { Utils } from './utils';

export abstract class SequelizeModel {


    /**
     * user will make a model class  -- checked
     * we will collect the attribute , association , and any other hooks data needed in the operation -- checked
     * then make the closure for the sequelize --checked
     * now we need to make another class which should take sequelize object and the models folder path
     * it will then initialize all the models in it which extends my sequelize models class 
     * by
     * run initializemodel and pass it to the import method in the sequelize 
     * then running the associate function on all the model classes
     * also this class should take an options object which will give the user the 
     * ability to expose the models in the global scope
     */


    /**
     * parameters that could be overriden
     */
    public modelName = null;

    /**
     * sequelize model object
     */
    public model = null;

    /**
     * private paramters
     */
    private utils: Utils;

    constructor() {
        this.utils = new Utils();
    }

    initializeModel(sequelize: Sequelize, DataTypes: DataTypes, modelsExtenders?: string[] | Function[]) {
        let options = this.getOptions();

        // merging hooks in methods and hooks in options if exists
        let hooks = this.mergeHooks(this.getHooks(), options.hooks);
        options.hooks = hooks;

        // defining the model
        this.model = sequelize.define(this.getModelName(), this.getAttributes(DataTypes), options);

        // do some custom actions if the user want and giving it the model as a paramter
        this.modelAction(this.model);

        // running model extenders
        this.putExtendsInModel(modelsExtenders);

        return this.model;
    }

    /**
     * @description get the attributes for the sequelize model
     * @param DataTypes 
     * (required)
     */
    // getAttributes(DataTypes: DataTypes): DefineAttributes {
    // throw new Error('Please override the getAttributes function and return the attributes object');
    // }

    abstract getAttributes(DataTypes: DataTypes): DefineAttributes;

    /**
     * @description get the options for sequelize model
     * which if implemented hooks inside it will override the other hooks and will just be done 
     * whats in it
     */
    getOptions(): DefineOptions<any> {
        return {};
    }

    /**
     * @description get model name for model definition
     */
    getModelName() {
        if (this.modelName)
            return this.modelName;

        return this.modelName = Object.getPrototypeOf(this).constructor.name;
    }

    /**
     * @description make your associations in this function
     */
    associate(models: any, currentModel: Model<any, any>): any {
        return this.notImplemented();
    }

    /**
     * @description get the hooks the user implemented and add it in the attributes object
     */
    private getHooks() {
        let methods: string[] = Object.keys(Object.getPrototypeOf(this));
        let hooksObject = {};
        let implementedHooks = methods.filter(method => {

            let filterStatus = (method.indexOf('before') != -1 || method.indexOf('after') != -1) && (typeof this[method]() !== 'string')
            if (filterStatus) {
                let hookClosure = this[method]();

                if (!this.utils.isClosure(hookClosure))
                    throw Error(`Hook ${method} in model ${this.getModelName()} does not return a closure, Please make sure you return the hook closure`);

                hooksObject[method] = hookClosure;
            }

            return filterStatus;
        });

        return hooksObject;
    }

    private putExtendsInModel(modelsExtenders = []) {
        let model = this.model;
        if (!model)
            throw Error('You cannot extend an unintialized model');

        let extendedClosures: any[] = this.extendModel();

        if (!Array.isArray(extendedClosures))
            throw Error('extendModel function should return an array of strings or functions');

        // handling if modelsExtenders came with undefined
        modelsExtenders = modelsExtenders || [];

        // concate the modelsExtenders which are global on all the models 
        // with the extendModel which is specific for each model
        extendedClosures = extendedClosures.concat(modelsExtenders);

        extendedClosures.forEach((closure: any) => {

            // case closure was a string
            if (typeof closure === 'string' && this.utils.isClosure(this[closure]))
                model[closure] = this[closure];

            // case closure was a function
            if (this.utils.isClosure(closure))
                model[closure.name] = closure;

            // throw error if was not a closure or a string
            if (!this.utils.isClosure(closure) && typeof closure !== 'string')
                throw Error(`Paramter ${closure} is not a function or a string`);

            // case paramter was a string but it does not exist in class
            if (typeof closure === 'string' && !this.utils.isClosure(this[closure]))
                throw Error(`Function name ${closure} does not exist in class or is not a function`);
        });
    }

    private mergeHooks(methodHooks, optionHooks) {
        if (optionHooks)
            return Object.assign({}, methodHooks, optionHooks);

        return methodHooks;
    }

    public extendModel() {
        return [];
    }

    /**
     * @description any additional things you would like to do with the model you can do it here
     * @param model 
     */
    modelAction(model: Model<any, any>) {
        return this.notImplemented();
    }

    /** 
     *  validation hooks
     */
    beforeValidate(): any { return this.notImplemented(); };
    afterValidate(): any { return this.notImplemented(); };

    /** 
     *  creation hooks
     */
    beforeCreate(): any { return this.notImplemented(); };
    afterCreate(): any { return this.notImplemented(); };

    /** 
     *  destroy and delete hooks
     */
    beforeDestroy(): any { return this.notImplemented(); };
    beforeDelete(): any { return this.notImplemented(); };
    afterDestroy(): any { return this.notImplemented(); };
    afterDelete(): any { return this.notImplemented(); };

    /** 
     *  update hooks
     */

    beforeUpdate(): any { return this.notImplemented(); };
    afterUpdate(): any { return this.notImplemented(); };

    /**
     * bulk hooks
     */
    beforeBulkCreate(): any { return this.notImplemented(); };
    afterBulkCreate(): any { return this.notImplemented(); };
    beforeBulkDestroy(): any { return this.notImplemented(); };
    beforeBulkDelete(): any { return this.notImplemented(); };
    afterBulkDestroy(): any { return this.notImplemented(); };
    afterBulkDelete(): any { return this.notImplemented(); };
    beforeBulkUpdate(): any { return this.notImplemented(); };
    afterBulkUpdate(): any { return this.notImplemented(); };

    /**
     * find hooks
     */
    beforeFind(): any { return this.notImplemented(); };
    beforeFindAfterExpandIncludeAll(): any { return this.notImplemented(); };
    beforeFindAfterOptions(): any { return this.notImplemented(); };
    afterFind(): any { return this.notImplemented(); };


    private notImplemented() {
        return 'not implemented';
    }
}