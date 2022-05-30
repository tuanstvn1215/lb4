import { ContextView } from '@loopback/core';
import { Message } from './types';
/**
 * Configuration for CachingService
 */
export interface CachingServiceOptions {
    ttl: number;
}
/**
 * Message caching service
 */
export declare class CachingService {
    private optionsView;
    private timer;
    private store;
    constructor(optionsView: ContextView<CachingServiceOptions>);
    /**
     * Store a message in the cache
     * @param key - Key for caching
     * @param message - Message
     */
    set(key: string, message: Message): Promise<void>;
    /**
     * Load a message from the cache by key
     * @param key - Key for caching
     */
    get(key: string): Promise<Message | undefined>;
    /**
     * Delete a message from the cache by key
     * @param key - Key for caching
     */
    delete(key: string): Promise<boolean>;
    /**
     * Clear the cache
     */
    clear(): Promise<void>;
    /**
     * Check if the cached item is expired by key
     * @param key - Key for caching
     * @param now - The current date
     */
    isExpired(key: string, now?: Date): Promise<boolean>;
    /**
     * Get the TTL setting
     */
    getTTL(): Promise<number>;
    /**
     * Remove expired items from the cache
     */
    sweep(): Promise<void>;
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
    /**
     * This method may be used to restart the service (and may be triggered by a
     * 'refresh' event)
     */
    restart(): Promise<void>;
}
