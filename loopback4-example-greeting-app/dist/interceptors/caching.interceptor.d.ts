import { Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise } from '@loopback/core';
import { CachingService } from '../caching-service';
export declare class CachingInterceptor implements Provider<Interceptor> {
    private cachingService;
    constructor(cachingService: CachingService);
    value(): (ctx: InvocationContext, next: () => ValueOrPromise<InvocationResult>) => Promise<any>;
}
