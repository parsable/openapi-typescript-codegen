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
        models: {
            model: () => 'model',
            index: () => 'modelIndex',
        },
        services: {
            service: () => 'service',
            index: () => 'serviceIndex',
        },
        schemas: {
            schema: () => 'schema',
            index: () => 'schemaIndex',
        },
        core: {
            index: () => 'coreIndex',
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


<<<<<<< HEAD
    it('should write to filesystem when exportClient false', async () => {
        await writeClientCore(client, templates, '/', HttpClient.FETCH, Indent.SPACE_4, false);

        expect(writeFile).toBeCalledWith('/OpenAPI.ts', `settings${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiError.ts', `apiError${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', `apiRequestOptions${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiResult.ts', `apiResult${EOL}`);
        expect(writeFile).toBeCalledWith('/CancelablePromise.ts', `cancelablePromise${EOL}`);
        expect(writeFile).toBeCalledWith('/request.ts', `request${EOL}`);
=======
        expect(writeFile).toBeCalledWith('/OpenAPI.ts', 'settings');
        expect(writeFile).toBeCalledWith('/ApiError.ts', 'apiError');
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', 'apiRequestOptions');
        expect(writeFile).toBeCalledWith('/ApiResult.ts', 'apiResult');
        expect(writeFile).toBeCalledWith('/request.ts', 'request');
        expect(writeFile).toBeCalledWith('/index.ts', 'coreIndex');
>>>>>>> 131d3f5 (PE-2152 - export index files)
    });

    it('should write to filesystem when exportClient true', async () => {
        await writeClientCore(client, templates, '/', HttpClient.FETCH, Indent.SPACE_4, true);

<<<<<<< HEAD
        expect(writeFile).toBeCalledWith('/OpenAPI.ts', `settings${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiError.ts', `apiError${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', `apiRequestOptions${EOL}`);
        expect(writeFile).toBeCalledWith('/ApiResult.ts', `apiResult${EOL}`);
        expect(writeFile).toBeCalledWith('/BaseHttpRequest.ts', `baseHttpRequest${EOL}`);
        expect(writeFile).toBeCalledWith('/FetchHttpRequest.ts', `httpRequest${EOL}`);
=======
        expect(writeFile).toBeCalledWith('/OpenAPI.ts', 'settings');
        expect(writeFile).toBeCalledWith('/ApiError.ts', 'apiError');
        expect(writeFile).toBeCalledWith('/ApiRequestOptions.ts', 'apiRequestOptions');
        expect(writeFile).toBeCalledWith('/ApiResult.ts', 'apiResult');
        expect(writeFile).toBeCalledWith('/BaseHttpRequest.ts', 'baseHttpRequest');
        expect(writeFile).toBeCalledWith('/FetchHttpRequest.ts', 'fetchRequest');
        expect(writeFile).toBeCalledWith('/index.ts', 'coreIndex');
>>>>>>> 131d3f5 (PE-2152 - export index files)
    });
});
