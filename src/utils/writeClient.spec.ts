import type { Client } from '../client/interfaces/Client';
import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import { mkdir, rmdir, writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClient } from './writeClient';

jest.mock('./fileSystem');

describe('writeClient', () => {
    it('should write to filesystem', async () => {
        const client: Client = {
            server: 'http://localhost:8080',
            version: 'v1',
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
<<<<<<< HEAD
                httpRequest: () => 'httpRequest',
=======
                request: () => 'request',
                httpRequest: {
                    fetch: () => 'fetchRequest',
                    node: () => 'nodeRequest',
                    xhr: () => 'xhrRequest',
                },
>>>>>>> 131d3f5 (PE-2152 - export index files)
            },
        };

        await writeClient(
            client,
            templates,
            './dist',
            HttpClient.FETCH,
            false,
            false,
            true,
            true,
            true,
            true,
            Indent.SPACE_4,
            'Service',
            'AppClient',
            false
        );

        expect(rmdir).toBeCalled();
        expect(mkdir).toBeCalled();
        expect(writeFile).toBeCalled();
    });
});
