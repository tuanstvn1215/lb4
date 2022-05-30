"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.CachingInterceptor = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const debug_1 = tslib_1.__importDefault(require("debug"));
const caching_service_1 = require("../caching-service");
const keys_1 = require("../keys");
const debug = (0, debug_1.default)('greeter-extension');
let CachingInterceptor = class CachingInterceptor {
    constructor(cachingService) {
        this.cachingService = cachingService;
    }
    value() {
        return async (ctx, next) => {
            const httpReq = await ctx.get(rest_1.RestBindings.Http.REQUEST, {
                optional: true,
            });
            /* istanbul ignore if */
            if (!httpReq) {
                // Not http request
                return next();
            }
            const key = httpReq.path;
            const lang = httpReq.acceptsLanguages(['en', 'zh']) || 'en';
            const cachingKey = `${lang}:${key}`;
            const cachedResult = await this.cachingService.get(cachingKey);
            if (cachedResult) {
                debug('Cache found for %s %j', cachingKey, cachedResult);
                return cachedResult;
            }
            const result = await next();
            await this.cachingService.set(cachingKey, result);
            return result;
        };
    }
};
CachingInterceptor = tslib_1.__decorate([
    (0, core_1.injectable)((0, core_1.asGlobalInterceptor)('caching')),
    tslib_1.__param(0, (0, core_1.inject)(keys_1.CACHING_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [caching_service_1.CachingService])
], CachingInterceptor);
exports.CachingInterceptor = CachingInterceptor;
//# sourceMappingURL=caching.interceptor.js.map