import { resolve } from 'path';

import type { Service } from '../client/interfaces/Service';
import { HttpClient } from '../HttpClient';
import { writeFile } from './fileSystem';
import { format } from './format';
import { getHttpRequestName } from './getHttpRequestName';
import { Templates } from './registerHandlebarTemplates';
import { sortServicesByName } from './sortServicesByName';

const VERSION_TEMPLATE_STRING = 'OpenAPI.version';

/**
 * Generate Services using the Handlebar template and write to disk.
 * @param services Array of Services to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param httpClient The selected httpClient (fetch, xhr or node)
 * @param useUnionTypes Use union types instead of enums
 * @param useOptions Use options or arguments functions
 * @param exportClient Create client class
 */
export async function writeClientServices(
    services: Service[],
    templates: Templates,
    outputPath: string,
    httpClient: HttpClient,
    useUnionTypes: boolean,
    useOptions: boolean,
    exportClient: boolean
): Promise<void> {
    for (const service of services) {
        const file = resolve(outputPath, `${service.name}.ts`);
        const useVersion = service.operations.some(operation => operation.path.includes(VERSION_TEMPLATE_STRING));
        const templateResult = templates.services.service({
            ...service,
            httpClient,
            useUnionTypes,
            useVersion,
            useOptions,
            exportClient,
            httpClientRequest: getHttpRequestName(httpClient),
        });
        await writeFile(file, format(templateResult));

        const fileFull = resolve(outputPath, `${service.name}Full.ts`);
        const templateFullResult = templates.services.serviceFull({
            ...service,
            httpClient,
            useUnionTypes,
            useVersion,
            useOptions,
            exportClient,
            httpClientRequest: getHttpRequestName(httpClient),
        });
        await writeFile(fileFull, format(templateFullResult));
    }

    await writeFile(resolve(outputPath, 'index.ts'), templates.services.index({ services: sortServicesByName(services) }));
}
