import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DocuGenerateApi implements ICredentialType {
	name = 'docugenerateApi';
	displayName = 'DocuGenerate API';
	documentationUrl = 'https://api.docugenerate.com/';
	
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Your DocuGenerate API Key',
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
			baseURL: 'https://api.docugenerate.com',
			url: '/v1/template',
			method: 'GET',
		},
	};
}