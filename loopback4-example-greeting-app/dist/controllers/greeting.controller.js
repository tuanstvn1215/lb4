"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetingController = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const example_greeter_extension_1 = require("@loopback/example-greeter-extension");
const rest_1 = require("@loopback/rest");
/* istanbul ignore file */
let GreetingController = class GreetingController {
    constructor(greetingService, request) {
        this.greetingService = greetingService;
        this.request = request;
    }
    async greet(name) {
        const language = this.request.acceptsLanguages(['en', 'zh']) || 'en';
        const greeting = await this.greetingService.greet(language, name);
        return {
            timestamp: new Date(),
            language,
            greeting,
        };
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/greet/{name}', {
        responses: {
            '200': {
                description: '',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                timestamp: 'string',
                                language: 'string',
                                message: 'string',
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('name')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], GreetingController.prototype, "greet", null);
GreetingController = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)(example_greeter_extension_1.GREETING_SERVICE)),
    tslib_1.__param(1, (0, core_1.inject)(rest_1.RestBindings.Http.REQUEST)),
    tslib_1.__metadata("design:paramtypes", [example_greeter_extension_1.GreetingService, Object])
], GreetingController);
exports.GreetingController = GreetingController;
//# sourceMappingURL=greeting.controller.js.map