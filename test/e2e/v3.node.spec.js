'use strict';

const generate = require('./scripts/generate');
const compileWithTypescript = require('./scripts/compileWithTypescript');
const server = require('./scripts/server');

describe('v3.node', () => {
    beforeAll(async () => {
        await generate('v3/node', 'v3', 'node');
        compileWithTypescript('v3/node');
        await server.start('v3/node');
    }, 30000);

    afterAll(async () => {
        await server.stop();
    });

    it('requests token', async () => {
        const { OpenAPI, SimpleService } = require('./generated/v3/node/index.js');
        const tokenRequest = jest.fn().mockResolvedValue('MY_TOKEN');
        OpenAPI.token = tokenRequest;
        OpenAPI.username = undefined;
        OpenAPI.password = undefined;
        const result = await SimpleService.getCallWithoutParametersAndResponse();
        expect(tokenRequest.mock.calls.length).toBe(1);
        expect(result.body.headers.authorization).toBe('Bearer MY_TOKEN');
    });

    it('uses credentials', async () => {
        const { OpenAPI, SimpleService } = require('./generated/v3/node/index.js');
        OpenAPI.token = undefined;
        OpenAPI.username = 'username';
        OpenAPI.password = 'password';
        const result = await SimpleService.getCallWithoutParametersAndResponse();
        expect(result.body.headers.authorization).toBe('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
    });

    it('complexService', async () => {
        const { ComplexService } = require('./generated/v3/node/index.js');
        const result = await ComplexService.complexTypes({
            first: {
                second: {
                    third: 'Hello World!',
                },
            },
        });
        expect(result.body).toBeDefined();
    });
});

describe('v3.node with client', () => {
    beforeAll(async () => {
        await generate('v3/node_client', 'v3', 'node', false, false, true);
        compileWithTypescript('v3/node_client');
        await server.start('v3/node_client');
    }, 30000);

    afterAll(async () => {
        await server.stop();
    });

    it('requests token', async () => {
        const { AppClient } = require('./generated/v3/node_client/index.js');
        const tokenRequest = jest.fn().mockResolvedValue('MY_TOKEN');
        const client = new AppClient({ token: tokenRequest, username: undefined, password: undefined });
        const result = await client.simple.getCallWithoutParametersAndResponse();
        expect(tokenRequest.mock.calls.length).toBe(1);
        expect(result.body.headers.authorization).toBe('Bearer MY_TOKEN');
    });

    it('uses credentials', async () => {
        const { AppClient } = require('./generated/v3/node_client/index.js');
        const client = new AppClient({ token: undefined, username: 'username', password: 'password' });
        const result = await client.simple.getCallWithoutParametersAndResponse();
        expect(result.body.headers.authorization).toBe('Basic dXNlcm5hbWU6cGFzc3dvcmQ=');
    });

    it('complexService', async () => {
        const { AppClient } = require('./generated/v3/node_client/index.js');
        const client = new AppClient();
        const result = await client.complex.complexTypes({
            first: {
                second: {
                    third: 'Hello World!',
                },
            },
        });
        expect(result.body).toBeDefined();
    });
});
