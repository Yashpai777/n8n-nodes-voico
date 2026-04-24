import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class VoicoApi implements ICredentialType {
	name = 'voicoApi';

	displayName = 'Voico API';

	documentationUrl = 'https://platform.voico.ai/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			hint: 'Get your API key from platform.voico.ai/docs',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.voico.ai',
			url: '/api/calls',
			method: 'GET',
		},
	};
}