import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { templateOperations, templateFields } from './TemplateDescription';
import { documentOperations, documentFields } from './DocumentDescription';

export class DocuGenerate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'DocuGenerate',
		name: 'docuGenerate',
		icon: { 
			light: 'file:DocuGenerate.svg',
			dark: 'file:DocuGenerate.svg'
		},
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Automatically generate high-quality PDF documents from Word templates',
		defaults: {
			name: 'DocuGenerate'
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'docugenerateApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.docugenerate.com',
			headers: {
				Accept: 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Document',
						value: 'document',
						description: 'Create and manage documents'
					},
					{
						name: 'Template',
						value: 'template',
						description: 'Create and manage templates'
					}
				],
				default: 'template',
			},
			...documentOperations,
			...templateOperations,
			...documentFields,
			...templateFields
		],
	};
}