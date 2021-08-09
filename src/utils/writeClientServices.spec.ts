import type { Service } from '../client/interfaces/Service';
import { HttpClient } from '../HttpClient';
import { writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';
import { writeClientServices } from './writeClientServices';

jest.mock('./fileSystem');

describe('writeClientServices', () => {
    it('should write to filesystem', async () => {
        const services: Service[] = [
            {
                name: 'MyService',
                operations: [],
                imports: [],
            },
        ];

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
                baseHttpRequest: () => 'baseHttpRequest',
                request: () => 'request',
                httpRequest: {
                    fetch: () => 'fetchRequest',
                    node: () => 'nodeRequest',
                    xhr: () => 'xhrRequest',
                },
            },
        };

        await writeClientServices(services, templates, '/', HttpClient.FETCH, false, false, false);

        expect(writeFile).toBeCalledWith('/MyService.ts', 'service');
        expect(writeFile).toBeCalledWith('/index.ts', 'serviceIndex');
    });
});
