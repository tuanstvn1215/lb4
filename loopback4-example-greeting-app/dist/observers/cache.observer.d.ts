import { LifeCycleObserver } from '@loopback/core';
import { CachingService } from '../caching-service';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class CacheObserver implements LifeCycleObserver {
    private cachingService;
    private timer;
    constructor(cachingService: CachingService);
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
}
