"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoicoApi = void 0;
class VoicoApi {
    constructor() {
        this.name = 'voicoApi';
        this.displayName = 'Voico API';
        this.documentationUrl = 'https://platform.voico.ai/docs';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
            },
            {
                displayName: 'Base URL',
                name: 'domain',
                type: 'string',
                default: 'https://api.voico.ai',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.domain}}',
                url: '/api/calls',
            },
        };
    }
}
exports.VoicoApi = VoicoApi;
