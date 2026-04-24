import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

type VoicoCredentials = {
	apiKey: string;
};

export class Voico implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Voico',
		name: 'voico',
		icon: 'file:voico.svg',
		group: ['transform'],
		version: 1,
		description: 'AI Voice Agent — Make outbound calls, get call details and transcripts',
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

			// ── MAKE CALL FIELDS ──
			{
				displayName: 'Phone Number',
				name: 'phone',
				type: 'string',
				displayOptions: { show: { operation: ['makeCall'] } },
				default: '',
				required: true,
				placeholder: '+919999999999',
				description: 'Customer phone number with country code e.g. +491234567890',
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
				required: false,
				placeholder: '2024-01-15T10:30:00Z',
				description: 'Optional: ISO 8601 datetime to schedule the call. Leave empty to call in 1 minute.',
			},

			// ── GET CALL / GET TRANSCRIPT FIELDS ──
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const rawCreds = (await this.getCredentials('voicoApi')) as unknown as VoicoCredentials;
		const apiKey = rawCreds.apiKey;
		const baseUrl = 'https://api.voico.ai';

		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as string;

			let response: IDataObject;

			if (operation === 'makeCall') {

				const phone = String(this.getNodeParameter('phone', i));
				const agentId = this.getNodeParameter('agentId', i) as string;
				const firstMessage = this.getNodeParameter('firstMessage', i) as string;
				const prompt = this.getNodeParameter('prompt', i) as string;
				const scheduledTime = this.getNodeParameter('scheduledTime', i) as string;

				// Default: schedule 1 minute from now
				const callTime = scheduledTime
					? scheduledTime
					: new Date(Date.now() + 60000).toISOString();

				// Ensure phone has + prefix
				const formattedPhone = phone.startsWith('+') ? phone : `+${phone}`;

				// Build customer object
				const customer: IDataObject = {
					phone: formattedPhone,
				};
				if (firstMessage) customer.first_message = firstMessage;
				if (prompt) customer.prompt = prompt;

				// Make the API call
				response = await this.helpers.httpRequest({
					method: 'POST',
					url: `${baseUrl}/api/outbound-call/`,
					headers: {
						Authorization: apiKey,
						'Content-Type': 'application/json',
					},
					body: {
						agent_id: agentId,
						scheduled_time: callTime,
						customers: [customer],
					},
					json: true,
				});

			} else if (operation === 'getCall') {

				const callId = this.getNodeParameter('callId', i) as string;

				response = await this.helpers.httpRequest({
					method: 'GET',
					url: `${baseUrl}/api/calls/${callId}`,
					headers: {
						Authorization: apiKey,
						'Content-Type': 'application/json',
					},
					json: true,
				});

			} else if (operation === 'getTranscript') {

				const callId = this.getNodeParameter('callId', i) as string;

				response = await this.helpers.httpRequest({
					method: 'GET',
					url: `${baseUrl}/api/calls/transcripts?call_id=${callId}`,
					headers: {
						Authorization: apiKey,
						'Content-Type': 'application/json',
					},
					json: true,
				});

			} else {
				throw new Error(`Unknown operation: ${operation}`);
			}

			// Wrap response safely
			const json: IDataObject =
				response !== null && typeof response === 'object' && !Array.isArray(response)
					? (response as IDataObject)
					: ({ data: response } as IDataObject);

			returnData.push({ json });
		}

		return [returnData];
	}
}