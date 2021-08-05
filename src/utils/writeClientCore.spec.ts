import type { Client } from '../client/interfaces/Client';
import { HttpClient } from '../HttpClient';
import { writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';
import { writeClientCore } from './writeClientCore';

jest.mock('./fileSystem');

describe('writeClientCore', () => {
    const client: Client = {
        server: 'http://localhost:8080',
        version: '1.0',
        models: [],
        services: [],
    };

    const templates: Templates = {
        index: () => 'index',
        client: () => 'client',
        exports: {
            model: () => 'model',
            schema: () => 'schema',
            service: () => 'service',
        },
        core: {
            settings: () => 'settings',
            apiError: () => 'apiError',
            apiRequestOptions: () => 'apiRequestOptions',
            apiResult: () => 'apiResult',
            baseHttpRequest: () => 'baseHttpRequest',
            request: () => 'request',
            httpRequest: {
                fetch: () => 'fetchRequest',
                node: () => 'nodeRequest',
                xhr: () => 'xhrRequest',
            },
        },
    };

    it('should write to filesystem when exportClient false', async () => {
        await writeClientCore(client, templates, '/', HttpClient.FETCH, false);

        expect(writeFile).toBeCalledWith('/OpenAPI.ts', 'settings');
        expect(writeFile).toBeCalledWith('/ApiError.ts', 'apiError');
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', 'apiRequestOptions');
        expect(writeFile).toBeCalledWith('/ApiResult.ts', 'apiResult');
        expect(writeFile).toBeCalledWith('/request.ts', 'request');
    });

    it('should write to filesystem when exportClient true', async () => {
        await writeClientCore(client, templates, '/', HttpClient.FETCH, true);

        expect(writeFile).toBeCalledWith('/OpenAPI.ts', 'settings');
        expect(writeFile).toBeCalledWith('/ApiError.ts', 'apiError');
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', 'apiRequestOptions');
        expect(writeFile).toBeCalledWith('/ApiResult.ts', 'apiResult');
        expect(writeFile).toBeCalledWith('/BaseHttpRequest.ts', 'baseHttpRequest');
        expect(writeFile).toBeCalledWith('/FetchHttpRequest.ts', 'fetchRequest');
        expect(writeFile).toBeCalledWith('/NodeHttpRequest.ts', 'nodeRequest');
        expect(writeFile).toBeCalledWith('/XhrHttpRequest.ts', 'xhrRequest');
    });
});
