import { sequelizeModel } from './index';

export class Utils {

    getModelNameFromPath(modelPath: string) {
        let splitter = modelPath.split('/');
        return (splitter[splitter.length - 1]);
    }

    isClosure(method: any) {
        return typeof method === 'function';
    }

}