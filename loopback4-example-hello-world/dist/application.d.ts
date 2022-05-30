import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
export { ApplicationConfig };
export declare class HelloWorldApplication extends RestApplication {
    constructor(options?: ApplicationConfig);
    start(): Promise<void>;
}
