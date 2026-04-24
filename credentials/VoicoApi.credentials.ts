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
},
{
displayName: 'Base URL',
name: 'domain',
type: 'string',
default: 'https://api.voico.ai',
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
baseURL: '={{$credentials?.domain}}',
url: '/api/calls',
},
};
}
