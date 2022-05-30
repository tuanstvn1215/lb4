"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const caching_service_1 = require("../caching-service");
const keys_1 = require("../keys");
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let CacheObserver = class CacheObserver {
    constructor(cachingService) {
        this.cachingService = cachingService;
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        await this.cachingService.start();
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        await this.cachingService.stop();
    }
};
CacheObserver = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('caching'),
    tslib_1.__param(0, (0, core_1.inject)(keys_1.CACHING_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [caching_service_1.CachingService])
], CacheObserver);
exports.CacheObserver = CacheObserver;
//# sourceMappingURL=cache.observer.js.map