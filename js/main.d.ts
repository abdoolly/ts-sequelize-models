import { SequelizeModel } from './SequelizeModel';
import { SequelizeInit } from './SequelizeInit';
import { initOptions, syncOptions } from './interfaces/initOptions';

export declare const sequelizeModel: typeof SequelizeModel;
export declare type sequelizeModel = SequelizeModel;
export declare const sequelizeInit: typeof SequelizeInit.initializeModels;

export interface initOptions extends initOptions { }
export interface syncOptions extends syncOptions { }