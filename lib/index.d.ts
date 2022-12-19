import { Config } from './types';
declare class Printer {
    private config;
    constructor(config: Config);
    private prepare;
    base64(): Promise<string>;
}
export { Printer };
