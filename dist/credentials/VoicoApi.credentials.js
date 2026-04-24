"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoicoApi = void 0;
class VoicoApi {
    constructor() {
        this.name = 'voicoApi';
        this.displayName = 'Voico API';
        this.properties = [
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                default: '',
                required: true,
            },
        ];
    }
}
exports.VoicoApi = VoicoApi;
