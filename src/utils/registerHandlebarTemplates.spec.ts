import { HttpClient } from '../HttpClient';
import { registerHandlebarTemplates } from './registerHandlebarTemplates';

describe('registerHandlebarTemplates', () => {
    it('should return correct templates', () => {
        const templates = registerHandlebarTemplates({
            httpClient: HttpClient.FETCH,
            useOptions: false,
            useUnionTypes: false,
        });
        expect(templates.index).toBeDefined();
        expect(templates.models.model).toBeDefined();
        expect(templates.models.index).toBeDefined();
        expect(templates.services.service).toBeDefined();
        expect(templates.services.index).toBeDefined();
        expect(templates.schemas.schema).toBeDefined();
        expect(templates.schemas.index).toBeDefined();
        expect(templates.core.settings).toBeDefined();
        expect(templates.core.apiError).toBeDefined();
        expect(templates.core.apiRequestOptions).toBeDefined();
        expect(templates.core.apiResult).toBeDefined();
        expect(templates.core.request).toBeDefined();
        expect(templates.core.baseHttpRequest).toBeDefined();
        expect(templates.client).toBeDefined();
    });
});
