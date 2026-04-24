"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voico = void 0;
var Voico = /** @class */ (function () {
    function Voico() {
        this.description = {
            displayName: 'Voico',
            name: 'voico',
            group: ['communication'],
            version: 1,
            description: 'AI Voice Agent',
            defaults: { name: 'Voico' },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [{ name: 'voicoApi', required: true }],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    options: [
                        { name: 'Make Call', value: 'makeCall' },
                        { name: 'Get Call', value: 'getCall' },
                        { name: 'Get Transcript', value: 'getTranscript' },
                    ],
                    default: 'makeCall',
                },
                {
                    displayName: 'Phone',
                    name: 'phone',
                    type: 'string',
                    displayOptions: { show: { operation: ['makeCall'] } },
                    default: '',
                    required: true,
                },
                {
                    displayName: 'Scenario',
                    name: 'scenario',
                    type: 'string',
                    displayOptions: { show: { operation: ['makeCall'] } },
                    default: '',
                    required: true,
                },
                {
                    displayName: 'Call ID',
                    name: 'callId',
                    type: 'string',
                    displayOptions: { show: { operation: ['getCall', 'getTranscript'] } },
                    default: '',
                    required: true,
                },
            ],
        };
    }
    Voico.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, returnData, credentials, i, operation, phone, scenario, response, callId, response, callId, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = this.getInputData();
                        returnData = [];
                        return [4 /*yield*/, this.getCredentials('voicoApi')];
                    case 1:
                        credentials = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < items.length)) return [3 /*break*/, 9];
                        operation = this.getNodeParameter('operation', i);
                        if (!(operation === 'makeCall')) return [3 /*break*/, 4];
                        phone = this.getNodeParameter('phone', i);
                        scenario = this.getNodeParameter('scenario', i);
                        return [4 /*yield*/, this.helpers.httpRequest({
                                method: 'POST',
                                url: 'https://api.voico.ai/v1/calls',
                                headers: { Authorization: Bearer, 'Content-Type': 'application/json' },
                                body: { to: phone, scenario_id: scenario },
                            })];
                    case 3:
                        response = _a.sent();
                        returnData.push({ json: response });
                        _a.label = 4;
                    case 4:
                        if (!(operation === 'getCall')) return [3 /*break*/, 6];
                        callId = this.getNodeParameter('callId', i);
                        return [4 /*yield*/, this.helpers.httpRequest({
                                method: 'GET',
                                url: https, //api.voico.ai/v1/calls/,
                                headers: { Authorization: Bearer },
                            })];
                    case 5:
                        response = _a.sent();
                        returnData.push({ json: response });
                        _a.label = 6;
                    case 6:
                        if (!(operation === 'getTranscript')) return [3 /*break*/, 8];
                        callId = this.getNodeParameter('callId', i);
                        return [4 /*yield*/, this.helpers.httpRequest({
                                method: 'GET',
                                url: https, //api.voico.ai/v1/calls//transcript,
                                headers: { Authorization: Bearer },
                            })];
                    case 7:
                        response = _a.sent();
                        returnData.push({ json: response });
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 2];
                    case 9: return [2 /*return*/, [returnData]];
                }
            });
        });
    };
    return Voico;
}());
exports.Voico = Voico;
