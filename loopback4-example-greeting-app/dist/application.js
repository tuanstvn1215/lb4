"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetingApplication = void 0;
const boot_1 = require("@loopback/boot");
const core_1 = require("@loopback/core");
const example_greeter_extension_1 = require("@loopback/example-greeter-extension");
const rest_1 = require("@loopback/rest");
const caching_service_1 = require("./caching-service");
const interceptors_1 = require("./interceptors");
const keys_1 = require("./keys");
class GreetingApplication extends (0, boot_1.BootMixin)(rest_1.RestApplication) {
    constructor(config = {}) {
        super(config);
        this.projectRoot = __dirname;
        this.add((0, core_1.createBindingFromClass)(caching_service_1.CachingService, { key: keys_1.CACHING_SERVICE }));
        this.add((0, core_1.createBindingFromClass)(interceptors_1.CachingInterceptor));
        this.component(example_greeter_extension_1.GreetingComponent);
    }
    async main() {
        await this.boot();
        await this.start();
    }
}
exports.GreetingApplication = GreetingApplication;
//# sourceMappingURL=application.js.map