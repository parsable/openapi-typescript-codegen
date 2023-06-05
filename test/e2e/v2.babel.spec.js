'use strict';

const generate = require('./scripts/generate');
const copy = require('./scripts/copy');
const compileWithBabel = require('./scripts/compileWithBabel');
const server = require('./scripts/server');
const browser = require('./scripts/browser');

describe('v2.fetch', () => {
    beforeAll(async () => {
        await generate('v2/babel', 'v2', 'fetch', true, true);
        await copy('v2/babel');
        compileWithBabel('v2/babel');
        await server.start('v2/babel');
        await browser.start();
    }, 30000);

    afterAll(async () => {
        await server.stop();
        await browser.stop();
    });

    it('requests token', async () => {
        await browser.exposeFunction('tokenRequest', jest.fn().mockResolvedValue('MY_TOKEN'));
        const result = await browser.evaluate(async () => {
            const { OpenAPI, SimpleService } = window.api;
            OpenAPI.token = window.tokenRequest;
            return await SimpleService.getCallWithoutParametersAndResponse();
        });
        expect(result.body.headers.authorization).toBe('Bearer MY_TOKEN');
    });

    it('complexService', async () => {
        const result = await browser.evaluate(async () => {
            const { ComplexService } = window.api;
            return await ComplexService.complexTypes({
                first: {
                    second: {
                        third: 'Hello World!',
                    },
                },
            });
        });
        expect(result).toBeDefined();
    });
});

describe('v2.fetch with client', () => {
    beforeAll(async () => {
        await generate('v2/babel_client', 'v2', 'fetch', true, true, true);
        await copy('v2/babel_client');
        compileWithBabel('v2/babel_client');
        await server.start('v2/babel_client');
        await browser.start();
    }, 30000);

    afterAll(async () => {
        await server.stop();
        await browser.stop();
    });

    it('requests token', async () => {
        await browser.exposeFunction('tokenRequest', jest.fn().mockResolvedValue('MY_TOKEN'));
        const result = await browser.evaluate(async () => {
            const { AppClient } = window.api;
            const client = new AppClient({ token: window.tokenRequest });
            return await client.simple.getCallWithoutParametersAndResponse();
        });
        expect(result.body.headers.authorization).toBe('Bearer MY_TOKEN');
    });

    it('complexService', async () => {
        const result = await browser.evaluate(async () => {
            const { AppClient } = window.api;
            const client = new AppClient();
            return await client.complex.complexTypes({
                first: {
                    second: {
                        third: 'Hello World!',
                    },
                },
            });
        });
        expect(result.body).toBeDefined();
    });
});
