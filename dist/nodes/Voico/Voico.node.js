"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Voico = void 0;
class Voico {
    constructor() {
        this.description = {
            displayName: 'Voico',
            name: 'voico',
            icon: 'file:voico.svg',
            group: ['transform'],
            version: 1,
            description: 'AI Voice Agent — Make outbound AI calls, get call details and transcripts',
            defaults: {
                name: 'Voico',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'voicoApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        { name: 'Make Call', value: 'makeCall', description: 'Schedule an outbound AI call' },
                        { name: 'Get Call', value: 'getCall', description: 'Get details of a specific call' },
                        { name: 'Get Transcript', value: 'getTranscript', description: 'Get transcript of a completed call' },
                    ],
                    default: 'makeCall',
                },
                {
                    displayName: 'Phone Number',
                    name: 'phone',
                    type: 'string',
                    displayOptions: { show: { operation: ['makeCall'] } },
                    default: '',
                    required: true,
                    placeholder: '+919999999999',
                    description: 'Customer phone number with country code',
                },
                {
                    displayName: 'Agent ID',
                    name: 'agentId',
                    type: 'string',
                    displayOptions: { show: { operation: ['makeCall'] } },
                    default: '',
                    required: true,
                    description: 'Your Voico Agent ID from the Agents page',
                },
                {
                    displayName: 'First Message',
                    name: 'firstMessage',
                    type: 'string',
                    displayOptions: { show: { operation: ['makeCall'] } },
                    default: '',
                    required: false,
                    description: 'The first thing the agent will say when the customer picks up',
                },
                {
                    displayName: 'Prompt Override',
                    name: 'prompt',
                    type: 'string',
                    typeOptions: { rows: 4 },
                    displayOptions: { show: { operation: ['makeCall'] } },
                    default: '',
                    required: false,
                    description: 'Optional: override the agent prompt for this specific call',
                },
                {
                    displayName: 'Scheduled Time',
                    name: 'scheduledTime',
                    type: 'string',
                    displayOptions: { show: { operation: ['makeCall'] } },
                    default: '',
                    placeholder: '2024-01-15T10:30:00Z',
                    description: 'Optional: ISO 8601 datetime to schedule the call. Leave empty to call in 1 minute.',
                },
                {
                    displayName: 'Call ID',
                    name: 'callId',
                    type: 'string',
                    displayOptions: { show: { operation: ['getCall', 'getTranscript'] } },
                    default: '',
                    required: true,
                    description: 'The call ID returned from Make Call (job_id field)',
                },
            ],
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const baseUrl = 'https://api.voico.ai';
        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i);
            let response;
            if (operation === 'makeCall') {
                const phone = String(this.getNodeParameter('phone', i));
                const agentId = this.getNodeParameter('agentId', i);
                const firstMessage = this.getNodeParameter('firstMessage', i);
                const prompt = this.getNodeParameter('prompt', i);
                const scheduledTime = this.getNodeParameter('scheduledTime', i);
                const callTime = scheduledTime
                    ? scheduledTime
                    : new Date(Date.now() + 60000).toISOString();
                const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;
                const customer = { phone: formattedPhone };
                if (firstMessage)
                    customer.first_message = firstMessage;
                if (prompt)
                    customer.prompt = prompt;
                response = await this.helpers.httpRequestWithAuthentication.call(this, 'voicoApi', {
                    method: 'POST',
                    url: `${baseUrl}/api/outbound-call/`,
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        agent_id: agentId,
                        scheduled_time: callTime,
                        customers: [customer],
                    },
                    json: true,
                });
            }
            else if (operation === 'getCall') {
                const callId = this.getNodeParameter('callId', i);
                response = await this.helpers.httpRequestWithAuthentication.call(this, 'voicoApi', {
                    method: 'GET',
                    url: `${baseUrl}/api/calls/${callId}`,
                    json: true,
                });
            }
            else if (operation === 'getTranscript') {
                const callId = this.getNodeParameter('callId', i);
                response = await this.helpers.httpRequestWithAuthentication.call(this, 'voicoApi', {
                    method: 'GET',
                    url: `${baseUrl}/api/calls/transcripts?call_id=${callId}`,
                    json: true,
                });
            }
            else {
                throw new Error(`Unknown operation: ${operation}`);
            }
            const json = response !== null && typeof response === 'object' && !Array.isArray(response)
                ? response
                : { data: response };
            returnData.push({ json });
        }
        return [returnData];
    }
}
exports.Voico = Voico;
