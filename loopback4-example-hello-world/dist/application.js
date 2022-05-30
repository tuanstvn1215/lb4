"use strict";
// Copyright IBM Corp. 2018,2020. All Rights Reserved.
// Node module: @loopback/example-hello-world
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloWorldApplication = void 0;
const rest_1 = require("@loopback/rest");
class HelloWorldApplication extends rest_1.RestApplication {
    constructor(options = {}) {
        super(options);
        // In this example project, we configure a sequence that always
        // returns the same HTTP response: Hello World!
        // Learn more about the concept of Sequence in our docs:
        //   http://loopback.io/doc/en/lb4/Sequence.html
        this.handler(({ response }, sequence) => {
            sequence.send(response, 'Hello World!');
        });
    }
    async start() {
        var _a;
        await super.start();
        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.disableConsoleLog)) {
            const rest = await this.getServer(rest_1.RestServer);
            console.log(`REST server running on port: ${await rest.get('rest.port')}`);
        }
    }
}
exports.HelloWorldApplication = HelloWorldApplication;
//# sourceMappingURL=application.js.map