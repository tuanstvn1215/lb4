"use strict";
// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-log-extension
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
Object.defineProperty(exports, "__esModule", { value: true });
const testlab_1 = require("@loopback/testlab");
const core_1 = require("@loopback/core");
const __1 = require("../../..");
describe('LogMixin (unit)', () => {
    let myApp;
    beforeEach(getApp);
    it('mixed class has .logLevel()', () => {
        (0, testlab_1.expect)(myApp.logLevel).to.be.a.Function();
    });
    it('binds LogLevel from constructor', () => {
        myApp = new AppWithLogMixin({
            logLevel: __1.LOG_LEVEL.ERROR,
        });
        expectLogLevelToBeBound();
    });
    it('bind logLevel from app.logLevel()', () => {
        myApp.logLevel(__1.LOG_LEVEL.ERROR);
        expectLogLevelToBeBound();
    });
    it('adds LogComponent to target class', () => {
        const boundComponent = myApp.find('components.*').map(b => b.key);
        (0, testlab_1.expect)(boundComponent).to.containEql('components.LogComponent');
    });
    class AppWithLogMixin extends (0, __1.LogMixin)(core_1.Application) {
    }
    function expectLogLevelToBeBound() {
        const logLevel = myApp.getSync(__1.EXAMPLE_LOG_BINDINGS.APP_LOG_LEVEL);
        (0, testlab_1.expect)(logLevel).to.be.eql(__1.LOG_LEVEL.ERROR);
    }
    function getApp() {
        myApp = new AppWithLogMixin();
    }
});
//# sourceMappingURL=log.mixin.unit.js.map