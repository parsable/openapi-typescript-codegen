import { EOL } from 'os';

import type { Client } from '../client/interfaces/Client';
import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import { writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
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
            cancelablePromise: () => 'cancelablePromise',
            request: () => 'request',
            baseHttpRequest: () => 'baseHttpRequest',
            httpRequest: () => 'httpRequest',
        },
    };


    it('should write to filesystem when exportClient false', async () => {
        await writeClientCore(client, templates, '/', HttpClient.FETCH, Indent.SPACE_4, false);

        expect(writeFile).toBeCalledWith('/OpenAPI.ts', `settings${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiError.ts', `apiError${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', `apiRequestOptions${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiResult.ts', `apiResult${EOL}`);
        expect(writeFile).toBeCalledWith('/CancelablePromise.ts', `cancelablePromise${EOL}`);
        expect(writeFile).toBeCalledWith('/request.ts', `request${EOL}`);
    });

    it('should write to filesystem when exportClient true', async () => {
        await writeClientCore(client, templates, '/', HttpClient.FETCH, Indent.SPACE_4, true);

        expect(writeFile).toBeCalledWith('/OpenAPI.ts', `settings${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiError.ts', `apiError${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', `apiRequestOptions${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiResult.ts', `apiResult${EOL}`);
        expect(writeFile).toBeCalledWith('/BaseHttpRequest.ts', `baseHttpRequest${EOL}`);
        expect(writeFile).toBeCalledWith('/FetchHttpRequest.ts', `httpRequest${EOL}`);
    });
});
