"use strict";
// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: @loopback/example-greeting-app
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const util_1 = require("util");
const __1 = require("../..");
const keys_1 = require("../../keys");
describe('GreetingApplication', () => {
    let app;
    let client;
    before(givenRunningApplicationWithCustomConfiguration);
    after(() => app.stop());
    before(() => {
        client = (0, testlab_1.createRestAppClient)(app);
    });
    it('gets a greeting in English', async function () {
        const response = await client
            .get('/greet/Raymond')
            .set('Accept-Language', 'en')
            .expect(200);
        (0, testlab_1.expect)(response.body).to.containEql({
            language: 'en',
            greeting: 'Hello, Raymond!',
        });
    });
    it('gets a greeting in Chinese', async function () {
        const response = await client
            .get('/greet/Raymond')
            .set('Accept-Language', 'zh')
            .expect(200);
        (0, testlab_1.expect)(response.body).to.containEql({
            language: 'zh',
            greeting: 'Raymond，你好！',
        });
    });
    it('gets a greeting from cache', async function () {
        app.configure(keys_1.CACHING_SERVICE).to({ ttl: 100 });
        let response = await client
            .get('/greet/Raymond')
            .set('Accept-Language', 'en')
            .expect(200);
        const msg1 = response.body;
        // Now the result should be cached
        response = await client
            .get('/greet/Raymond')
            .set('Accept-Language', 'en')
            .expect(200);
        (0, testlab_1.expect)(response.body).to.eql(msg1);
        // Cache should be expired now
        await (0, util_1.promisify)(setTimeout)(200);
        response = await client
            .get('/greet/Raymond')
            .set('Accept-Language', 'en')
            .expect(200);
        (0, testlab_1.expect)(response.body.timestamp).to.not.eql(msg1.timestamp);
    });
    async function givenRunningApplicationWithCustomConfiguration() {
        app = new __1.GreetingApplication({
            rest: (0, testlab_1.givenHttpServerConfig)(),
        });
        // Start Application
        await app.main();
    }
});
//# sourceMappingURL=greeting-service.integration.js.map