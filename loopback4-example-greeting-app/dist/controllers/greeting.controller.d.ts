/// <reference types="express" />
import { GreetingService } from '@loopback/example-greeter-extension';
import { Request } from '@loopback/rest';
import { Message } from '../types';
export declare class GreetingController {
    private greetingService;
    private request;
    constructor(greetingService: GreetingService, request: Request);
    greet(name: string): Promise<Message>;
}
