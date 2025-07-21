import { 
	ILoadOptionsFunctions,
	INodePropertyOptions,
	INodeType, 
	INodeTypeDescription, 
	IRequestOptions,
	NodeConnectionType 
} from 'n8n-workflow';
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
						description: 'Manage documents'
					},
					{
						name: 'Template',
						value: 'template',
						description: 'Manage templates'
					}
				],
				default: 'template',
			},
			
			// Document
			...documentOperations,
			...documentFields,
			
			// Template
			...templateOperations,
			...templateFields
		]
	};

	methods = {
		loadOptions: {
			async getTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const credentials = await this.getCredentials('docugenerateApi');
				
				const requestOptions: IRequestOptions = {
					method: 'GET',
					url: 'https://api.docugenerate.com/v1/template',
					headers: {
						'Authorization': credentials.apiKey as string,
						'Accept': 'application/json',
					},
					json: true,
				};

				try {
					const templates = await this.helpers.request(requestOptions);
					
					if (Array.isArray(templates)) {
						return templates.map((template: any) => ({
							name: template.name,
							value: template.id
						}));
					}
					
					return [];
				} catch (error) {
					return [];
				}
			}
		}
	};
}