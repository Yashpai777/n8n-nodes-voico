import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class VoicoApi implements ICredentialType {
  name = 'voicoApi';
  displayName = 'Voico API';
  properties: INodeProperties[] = [
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
