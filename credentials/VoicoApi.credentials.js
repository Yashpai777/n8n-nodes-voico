"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoicoApi = void 0;
var VoicoApi = /** @class */ (function () {
    function VoicoApi() {
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
    return VoicoApi;
}());
exports.VoicoApi = VoicoApi;
