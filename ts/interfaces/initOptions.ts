export interface initOptions {
    exposeGlobal?: boolean;
    sync?: syncOptions | boolean;
    [key: string]: any;
    extenders?: string[] | Function[];
}

export interface syncOptions {
    force?: boolean;
    match?: RegExp;
    logging?: boolean | Function;
    schema?: string;
    searchPath?: string;
    hooks?: boolean;
    alter?: boolean;
}