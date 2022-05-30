"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./application"), exports);
tslib_1.__exportStar(require("./keys"), exports);
tslib_1.__exportStar(require("./types"), exports);
const application_1 = require("./application");
async function main() {
    var _a, _b;
    const config = {
        rest: {
            port: +((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000),
            host: (_b = process.env.HOST) !== null && _b !== void 0 ? _b : '127.0.0.1',
            openApiSpec: {
                // useful when used with OpenAPI-to-GraphQL to locate your application
                setServersFromRequest: true,
            },
        },
    };
    const app = new application_1.GreetingApplication(config);
    await app.main();
    const url = app.restServer.url;
    console.log(`The service is running at ${url}/greet/world.`);
}
exports.main = main;
if (require.main === module) {
    main().catch(err => {
        console.error('Cannot start the application.', err);
        process.exit(1);
    });
}
//# sourceMappingURL=index.js.map