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
				resource: ['template'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new template',
				action: 'Create template',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/template',
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a template by ID',
				action: 'Delete template',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/template/{{$parameter.templateId}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a template by ID',
				action: 'Get template',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/template/{{$parameter.templateId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all templates',
				action: 'List templates',
				routing: {
					request: {
						method: 'GET',
						url: '/v1/template',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a template by ID',
				action: 'Update template',
				routing: {
					request: {
						method: 'PUT',
						url: '=/v1/template/{{$parameter.templateId}}',
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				},
			},
		],
		default: 'create',
	},
];

// Here we define what to show when the `create` operation is selected.
// We do that by adding `operation: ["create"]` to `displayOptions.show`
const createTemplate: INodeProperties[] = [
	{
		displayName: 'Template File',
		name: 'file',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		description: 'Binary data property containing the template file (.docx, .doc, .odt, .rtf, .txt, .sql, .html)',
		routing: {
			send: {
				property: 'file',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Template Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		description: 'The template name. If not provided, it will be initialized with the uploaded file name.',
		routing: {
			send: {
				property: 'name',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Left Delimiter',
		name: 'leftDelimiter',
		type: 'string',
		default: '[',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		description: 'Left delimiter for the tags (e.g., "[" for tags like [Name])',
		routing: {
			send: {
				property: 'delimiters.left',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Right Delimiter',
		name: 'rightDelimiter',
		type: 'string',
		default: ']',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		description: 'Right delimiter for the tags (e.g., "]" for tags like [Name])',
		routing: {
			send: {
				property: 'delimiters.right',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Enhanced Syntax',
		name: 'enhancedSyntax',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		description: 'Whether to enable nested properties and logical/mathematical operators',
		routing: {
			send: {
				property: 'enhanced_syntax',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Versioning Enabled',
		name: 'versioningEnabled',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['create'],
			},
		},
		description: 'Whether to enable template file versioning (Premium/Business plans only)',
		routing: {
			send: {
				property: 'versioning_enabled',
				type: 'body',
			},
		},
	},
];

// Here we define what to show when the `list` operation is selected.
const listTemplates: INodeProperties[] = [
	// No additional fields needed for list - it just lists all templates
];

// Here we define what to show when the `get` operation is selected.
const getTemplate: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['get'],
			},
		},
		description: 'The ID of the template to retrieve',
	},
];

// Here we define what to show when the `update` operation is selected.
const updateTemplate: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		description: 'The ID of the template to update',
	},
	{
		displayName: 'Template File',
		name: 'file',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		description: 'Binary data property containing the new template file (optional)',
		routing: {
			send: {
				property: 'file',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Template Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		description: 'The template name. If not provided, it will be initialized with the uploaded file name.',
		routing: {
			send: {
				property: 'name',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Left Delimiter',
		name: 'leftDelimiter',
		type: 'string',
		default: '[',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		description: 'Left delimiter for the tags (e.g., "[" for tags like [Name])',
		routing: {
			send: {
				property: 'delimiters.left',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Right Delimiter',
		name: 'rightDelimiter',
		type: 'string',
		default: ']',
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		description: 'Right delimiter for the tags (e.g., "]" for tags like [Name])',
		routing: {
			send: {
				property: 'delimiters.right',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Enhanced Syntax',
		name: 'enhancedSyntax',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		description: 'Whether to enable nested properties and logical/mathematical operators',
		routing: {
			send: {
				property: 'enhanced_syntax',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Versioning Enabled',
		name: 'versioningEnabled',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['update'],
			},
		},
		description: 'Whether to enable template file versioning (Premium/Business plans only)',
		routing: {
			send: {
				property: 'versioning_enabled',
				type: 'body',
			},
		},
	},
];

// Here we define what to show when the `delete` operation is selected.
const deleteTemplate: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['template'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the template to delete',
	},
];

export const templateFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                template:create                             */
	/* -------------------------------------------------------------------------- */
	...createTemplate,
	
	/* -------------------------------------------------------------------------- */
	/*                                template:list                               */
	/* -------------------------------------------------------------------------- */
	...listTemplates,

	/* -------------------------------------------------------------------------- */
	/*                                template:get                                */
	/* -------------------------------------------------------------------------- */
	...getTemplate,

	/* -------------------------------------------------------------------------- */
	/*                                template:update                             */
	/* -------------------------------------------------------------------------- */
	...updateTemplate,

	/* -------------------------------------------------------------------------- */
	/*                                template:delete                             */
	/* -------------------------------------------------------------------------- */
	...deleteTemplate,
];