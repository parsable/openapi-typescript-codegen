import { resolve } from 'path';

import type { Service } from '../client/interfaces/Service';
import type { HttpClient } from '../HttpClient';
import type { Indent } from '../Indent';
import { writeFile } from './fileSystem';
<<<<<<< HEAD
import { formatCode as f } from './formatCode';
import { formatIndentation as i } from './formatIndentation';
import { isDefined } from './isDefined';
import type { Templates } from './registerHandlebarTemplates';
=======
import { format } from './format';
import { getHttpRequestName } from './getHttpRequestName';
import { Templates } from './registerHandlebarTemplates';
import { sortServicesByName } from './sortServicesByName';

<<<<<<< HEAD
>>>>>>> 131d3f5 (PE-2152 - export index files)
const VERSION_TEMPLATE_STRING = 'OpenAPI.VERSION';
=======
const VERSION_TEMPLATE_STRING = 'OpenAPI.version';
>>>>>>> 1ee6314 (PE-2229 - rename OpenApi properties, remove config from http client, add config to request)

/**
 * Generate Services using the Handlebar template and write to disk.
 * @param services Array of Services to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param httpClient The selected httpClient (fetch, xhr, node or axios)
 * @param useUnionTypes Use union types instead of enums
 * @param useOptions Use options or arguments functions
 * @param indent Indentation options (4, 2 or tab)
 * @param postfix Service name postfix
 * @param exportClient Create client class
 * @param clientName Custom client class name
 */
export const writeClientServices = async (
    services: Service[],
    templates: Templates,
    outputPath: string,
    httpClient: HttpClient,
    useUnionTypes: boolean,
    useOptions: boolean,
    indent: Indent,
    postfix: string,
    exportClient: boolean,
    clientName?: string
): Promise<void> => {
    for (const service of services) {
<<<<<<< HEAD
        const file = resolve(outputPath, `${service.name}${postfix}.ts`);
        const templateResult = templates.exports.service({
=======
        const file = resolve(outputPath, `${service.name}.ts`);
        const useVersion = service.operations.some(operation => operation.path.includes(VERSION_TEMPLATE_STRING));
        const templateResult = templates.services.service({
>>>>>>> 131d3f5 (PE-2152 - export index files)
            ...service,
            httpClient,
            useUnionTypes,
            useOptions,
            postfix,
            exportClient: isDefined(clientName) || exportClient,
        });
        await writeFile(file, i(f(templateResult), indent));
    }
<<<<<<< HEAD
};
=======

    await writeFile(resolve(outputPath, 'index.ts'), templates.services.index({ services: sortServicesByName(services) }));
}
>>>>>>> 131d3f5 (PE-2152 - export index files)
