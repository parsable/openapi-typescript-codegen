import { EOL } from 'os';

import type { Model } from '../client/interfaces/Model';
import { HttpClient } from '../HttpClient';
import { Indent } from '../Indent';
import { writeFile } from './fileSystem';
import type { Templates } from './registerHandlebarTemplates';
import { writeClientSchemas } from './writeClientSchemas';

jest.mock('./fileSystem');

describe('writeClientSchemas', () => {
    it('should write to filesystem', async () => {
        const models: Model[] = [
            {
                export: 'interface',
                name: 'User',
                type: 'User',
                base: 'User',
                template: null,
                link: null,
                description: null,
                isDefinition: true,
                isReadOnly: false,
                isRequired: false,
                isNullable: false,
                imports: [],
                enum: [],
                enums: [],
                properties: [],
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

        await writeClientSchemas(models, templates, '/', HttpClient.FETCH, false, Indent.SPACE_4);

<<<<<<< HEAD
        expect(writeFile).toBeCalledWith('/$User.ts', `schema${EOL}`);
=======
        expect(writeFile).toBeCalledWith('/$MyModel.ts', 'schema');
        expect(writeFile).toBeCalledWith('/index.ts', 'schemaIndex');
>>>>>>> 131d3f5 (PE-2152 - export index files)
    });
});
