"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingService = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const debug_1 = tslib_1.__importDefault(require("debug"));
const debug = (0, debug_1.default)('greeter-extension');
/**
 * Message caching service
 */
let CachingService = class CachingService {
    constructor(optionsView) {
        this.optionsView = optionsView;
        this.store = new Map();
        // Use a view so that we can listen on `refresh` events, which are emitted
        // when the configuration binding is updated in the context.
        optionsView.on('refresh', () => {
            debug('Restarting the service as configuration changes...');
            this.restart().catch(err => {
                console.error('Cannot restart the caching service.', err);
                process.exit(1);
            });
        });
    }
    // We intentionally mark all operations `async` to reflect the commonly used
    // caching infrastructure even though our in-memory implementation is based
    // on a `Map` that provides synchronous APIs.
    /**
     * Store a message in the cache
     * @param key - Key for caching
     * @param message - Message
     */
    async set(key, message) {
        this.store.set(key, message);
    }
    /**
     * Load a message from the cache by key
     * @param key - Key for caching
     */
    async get(key) {
        const expired = await this.isExpired(key);
        debug('Getting cache for %s', key, expired);
        return expired ? undefined : this.store.get(key);
    }
    /**
     * Delete a message from the cache by key
     * @param key - Key for caching
     */
    async delete(key) {
        return this.store.delete(key);
    }
    /**
     * Clear the cache
     */
    async clear() {
        this.store.clear();
    }
    /**
     * Check if the cached item is expired by key
     * @param key - Key for caching
     * @param now - The current date
     */
    async isExpired(key, now = new Date()) {
        const ttl = await this.getTTL();
        const msg = this.store.get(key);
        if (!msg)
            return true;
        return now.getTime() - msg.timestamp.getTime() > ttl;
    }
    /**
     * Get the TTL setting
     */
    async getTTL() {
        var _a;
        const options = await this.optionsView.singleValue();
        debug('Caching options: %j', options);
        return (_a = options === null || options === void 0 ? void 0 : options.ttl) !== null && _a !== void 0 ? _a : 5000;
    }
    /**
     * Remove expired items from the cache
     */
    async sweep() {
        debug('Sweeping cache...');
        for (const key of this.store.keys()) {
            if (await this.isExpired(key)) {
                debug('Cache for %s is swept.', key);
                await this.delete(key);
            }
        }
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        debug('Starting caching service');
        await this.clear();
        const ttl = await this.getTTL();
        debug('TTL: %d', ttl);
        this.timer = setInterval(() => {
            this.sweep().catch(console.warn);
        }, ttl);
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        debug('Stopping caching service');
        /* istanbul ignore if */
        if (this.timer) {
            clearInterval(this.timer);
        }
        await this.clear();
    }
    /**
     * This method may be used to restart the service (and may be triggered by a
     * 'refresh' event)
     */
    async restart() {
        await this.stop();
        await this.start();
    }
};
CachingService = tslib_1.__decorate([
    (0, core_1.injectable)({ scope: core_1.BindingScope.SINGLETON }),
    tslib_1.__param(0, core_1.config.view()),
    tslib_1.__metadata("design:paramtypes", [core_1.ContextView])
], CachingService);
exports.CachingService = CachingService;
//# sourceMappingURL=caching-service.js.map