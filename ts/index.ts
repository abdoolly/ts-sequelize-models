import { SequelizeModel } from './SequelizeModel';
import { SequelizeInit } from './SequelizeInit';


/**
 * exporting SequelizeModel and it's type
 */
export const sequelizeModel = SequelizeModel;
export type sequelizeModel = SequelizeModel;

/**
 * exposing the SequelizeInit.initializeModels method to be used if needed
 */
export const sequelizeInit = SequelizeInit.initializeModels;