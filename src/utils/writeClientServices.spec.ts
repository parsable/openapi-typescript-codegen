import { EOL } from 'os';

import type { Service } from '../client/interfaces/Service';
import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import { writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClientServices } from './writeClientServices';

jest.mock('./fileSystem');

describe('writeClientServices', () => {
    it('should write to filesystem', async () => {
        const services: Service[] = [
            {
                name: 'User',
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
                cancelablePromise: () => 'cancelablePromise',
                request: () => 'request',
                baseHttpRequest: () => 'baseHttpRequest',
                httpRequest: () => 'httpRequest',
            },
        };

        await writeClientServices(
            services,
            templates,
            '/',
            HttpClient.FETCH,
            false,
            false,
            Indent.SPACE_4,
            'Service',
            false
        );

<<<<<<< HEAD
        expect(writeFile).toBeCalledWith('/UserService.ts', `service${EOL}`);
=======
        expect(writeFile).toBeCalledWith('/MyService.ts', 'service');
        expect(writeFile).toBeCalledWith('/index.ts', 'serviceIndex');
>>>>>>> 131d3f5 (PE-2152 - export index files)
    });
});
