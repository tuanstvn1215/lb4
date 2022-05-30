"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-hello-world
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const application_1 = require("../../application");
describe('Application', () => {
    let app;
    let client;
    before(givenAnApplication);
    before(async () => {
        await app.start();
        client = (0, testlab_1.createRestAppClient)(app);
    });
    after(async () => {
        await app.stop();
    });
    it('responds with hello world', async () => {
        const response = await client.get('/').expect(200);
        (0, testlab_1.expect)(response.text).to.eql('Hello World!');
    });
    function givenAnApplication() {
        app = new application_1.HelloWorldApplication({
            rest: (0, testlab_1.givenHttpServerConfig)(),
            disableConsoleLog: true,
        });
    }
});
//# sourceMappingURL=application.acceptance.js.map