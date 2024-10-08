import type { Model } from '../client/interfaces/Model';
import { HttpClient } from '../HttpClient';
import { writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';
import { writeClientSchemas } from './writeClientSchemas';

jest.mock('./fileSystem');

describe('writeClientSchemas', () => {
    it('should write to filesystem', async () => {
        const models: Model[] = [
            {
                export: 'interface',
                name: 'MyModel',
                type: 'MyModel',
                base: 'MyModel',
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
                baseHttpRequest: () => 'baseHttpRequest',
                request: () => 'request',
                httpRequest: {
                    fetch: () => 'fetchRequest',
                    node: () => 'nodeRequest',
                    xhr: () => 'xhrRequest',
                },
            },
        };

        await writeClientSchemas(models, templates, '/', HttpClient.FETCH, false);

        expect(writeFile).toBeCalledWith('/$MyModel.ts', 'schema');
        expect(writeFile).toBeCalledWith('/index.ts', 'schemaIndex');
    });
});
