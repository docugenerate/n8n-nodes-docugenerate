import { INodeProperties } from 'n8n-workflow';

// When the resource `template` is selected, this `operation` parameter will be shown.
export const templateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['template']
			}
		},
		options: [
			{
				name: 'Delete Template',
				value: 'delete',
				description: 'Delete a template by ID',
				action: 'Delete template',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/template/{{$parameter.templateId}}'
					}
				}
			},
			{
				name: 'Get Template',
				value: 'get',
				description: 'Get a template by ID',
				action: 'Get template',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/template/{{$parameter.templateId}}'
					}
				}
			},
			{
				name: 'List Templates',
				value: 'list',
				description: 'List all templates',
				action: 'List templates',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/template'
					}
				}
			}
		],
		default: 'list'
	}
];

// Here we define what to show when the `list` operation is selected.
const listTemplates: INodeProperties[] = [
	// No additional fields needed for list - it just lists all templates
];

// Here we define what to show when the `get` operation is selected.
const getTemplate: INodeProperties[] = [
	{
		displayName: 'Template Name or ID',
		name: 'templateId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getTemplates'
		},
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['get']
			}
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
	}
];

// Here we define what to show when the `delete` operation is selected.
const deleteTemplate: INodeProperties[] = [
	{
		displayName: 'Template Name or ID',
		name: 'templateId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getTemplates'
		},
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['delete']
			}
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>'
	}
];

export const templateFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                template:list                               */
	/* -------------------------------------------------------------------------- */
	...listTemplates,

	/* -------------------------------------------------------------------------- */
	/*                                template:get                                */
	/* -------------------------------------------------------------------------- */
	...getTemplate,

	/* -------------------------------------------------------------------------- */
	/*                                template:delete                             */
	/* -------------------------------------------------------------------------- */
	...deleteTemplate
];