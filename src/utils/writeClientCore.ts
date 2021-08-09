import { resolve } from 'path';

import type { Client } from '../client/interfaces/Client';
import type { HttpClient } from '../HttpClient';
import type { Indent } from '../Indent';
import { copyFile, exists, writeFile } from './fileSystem';
import { formatIndentation as i } from './formatIndentation';
import { getHttpRequestName } from './getHttpRequestName';
import { isDefined } from './isDefined';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Generate OpenAPI core files, this includes the basic boilerplate code to handle requests.
 * @param client Client object, containing, models, schemas and services
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param httpClient The selected httpClient (fetch, xhr, node or axios)
 * @param indent Indentation options (4, 2 or tab)
 * @param exportClient Create client class
 * @param clientName Custom client class name
 * @param request Path to custom request file
 */
export const writeClientCore = async (
    client: Client,
    templates: Templates,
    outputPath: string,
    httpClient: HttpClient,
    indent: Indent,
    exportClient: boolean,
    clientName?: string,
    request?: string
): Promise<void> => {
    const httpRequest = getHttpRequestName(httpClient);
    const context = {
        httpClient,
        clientName,
        httpRequest,
        server: client.server,
        version: client.version,
        exportClient,
        httpRequestName: getHttpRequestName(httpClient),
    };

<<<<<<< HEAD
    await writeFile(resolve(outputPath, 'OpenAPI.ts'), i(templates.core.settings(context), indent));
    await writeFile(resolve(outputPath, 'ApiError.ts'), i(templates.core.apiError(context), indent));
    await writeFile(resolve(outputPath, 'ApiRequestOptions.ts'), i(templates.core.apiRequestOptions(context), indent));
    await writeFile(resolve(outputPath, 'ApiResult.ts'), i(templates.core.apiResult(context), indent));
    await writeFile(resolve(outputPath, 'CancelablePromise.ts'), i(templates.core.cancelablePromise(context), indent));
    await writeFile(resolve(outputPath, 'request.ts'), i(templates.core.request(context), indent));

    if (isDefined(clientName) || exportClient) {
        await writeFile(resolve(outputPath, 'BaseHttpRequest.ts'), i(templates.core.baseHttpRequest(context), indent));
        await writeFile(resolve(outputPath, `${httpRequest}.ts`), i(templates.core.httpRequest(context), indent));
=======
    await writeFile(resolve(outputPath, 'OpenAPI.ts'), templates.core.settings(context));
    await writeFile(resolve(outputPath, 'ApiError.ts'), templates.core.apiError({}));
    await writeFile(resolve(outputPath, 'ApiRequestOptions.ts'), templates.core.apiRequestOptions({}));
    await writeFile(resolve(outputPath, 'ApiResult.ts'), templates.core.apiResult({}));
    if (exportClient) {
        await writeFile(resolve(outputPath, 'BaseHttpRequest.ts'), templates.core.baseHttpRequest({}));
        await writeFile(resolve(outputPath, `${getHttpRequestName(httpClient)}.ts`), templates.core.httpRequest[httpClient](context));
    } else {
        await writeFile(resolve(outputPath, `request.ts`), templates.core.request(context));
>>>>>>> 131d3f5 (PE-2152 - export index files)
    }

    if (request) {
        const requestFile = resolve(process.cwd(), request);
        const requestFileExists = await exists(requestFile);
        if (!requestFileExists) {
            throw new Error(`Custom request file "${requestFile}" does not exists`);
        }
        await copyFile(requestFile, resolve(outputPath, 'request.ts'));
    }
<<<<<<< HEAD
};
=======

    await writeFile(resolve(outputPath, 'index.ts'), templates.core.index(context));
}
>>>>>>> 131d3f5 (PE-2152 - export index files)
