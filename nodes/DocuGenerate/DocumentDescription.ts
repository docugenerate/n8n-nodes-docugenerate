import { INodeProperties } from 'n8n-workflow';

// When the resource `document` is selected, this `operation` parameter will be shown.
export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a document by ID',
				action: 'Delete document',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/document/{{$parameter.documentId}}',
					},
				},
			},
			{
				name: 'Generate',
				value: 'generate',
				description: 'Generate a document from a template',
				action: 'Generate document',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/document',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a document by ID',
				action: 'Get document',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/document/{{$parameter.documentId}}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List documents for a template',
				action: 'List documents',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/document?template_id={{$parameter.templateId}}',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a document by ID',
				action: 'Update document',
				routing: {
					request: {
						method: 'PUT',
						url: '=/v1/document/{{$parameter.documentId}}',
					},
				},
			},
		],
		default: 'generate',
	},
];

// Here we define what to show when the `generate` operation is selected.
// We do that by adding `operation: ["generate"]` to `displayOptions.show`
const generateDocument: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
			},
		},
		description: 'ID of the template to use for generating the document',
		routing: {
			send: {
				property: 'template_id',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		default: '{}',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
			},
		},
		description: 'JSON data to populate the template. Can be an object or array of objects.',
		routing: {
			send: {
				property: 'data',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Document Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
			},
		},
		description: 'Logical name for the document. If not provided, it will use the template name.',
		routing: {
			send: {
				property: 'name',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Output Name',
		name: 'outputName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
			},
		},
		description: 'Filename (without extension) of the generated document',
		routing: {
			send: {
				property: 'output_name',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Output Format',
		name: 'outputFormat',
		type: 'options',
		options: [
			{ name: 'DOC', value: '.doc' },
			{ name: 'DOCX', value: '.docx' },
			{ name: 'HTML', value: '.html' },
			{ name: 'ODT', value: '.odt' },
			{ name: 'PDF', value: '.pdf' },
			{ name: 'PDF/A-1B', value: '.pdf/a-1b' },
			{ name: 'PDF/A-2B', value: '.pdf/a-2b' },
			{ name: 'PDF/A-3B', value: '.pdf/a-3b' },
			{ name: 'PNG', value: '.png' },
			{ name: 'TXT', value: '.txt' },
		],
		default: '.docx',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
			},
		},
		description: 'Output format of the generated document',
		routing: {
			send: {
				property: 'output_format',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Output Quality',
		name: 'outputQuality',
		type: 'number',
		default: 100,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
				outputFormat: ['.pdf', '.pdf/a-1b', '.pdf/a-2b', '.pdf/a-3b', '.png'],
			},
		},
		description: 'Quality of the generated document (1-100, higher is better quality but larger file size)',
		routing: {
			send: {
				property: 'output_quality',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Single File',
		name: 'singleFile',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
			},
		},
		description: 'Whether to combine all generated documents into a single file or create a ZIP archive',
		routing: {
			send: {
				property: 'single_file',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Page Break',
		name: 'pageBreak',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
				singleFile: [true],
			},
		},
		description: 'Whether to add a page break after each data row',
		routing: {
			send: {
				property: 'page_break',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Merge With PDF',
		name: 'mergeWith',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
				outputFormat: ['.pdf', '.pdf/a-1b', '.pdf/a-2b', '.pdf/a-3b'],
			},
		},
		description: 'URL or Base64-encoded data URI of PDF file to merge at the end',
		routing: {
			send: {
				property: 'merge_with',
				type: 'body',
			},
		},
	},
	{
		displayName: 'Attach File',
		name: 'attach',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate'],
				outputFormat: ['.pdf', '.pdf/a-1b', '.pdf/a-2b', '.pdf/a-3b'],
			},
		},
		description: 'URL or Base64-encoded data URI of file to attach to the PDF',
		routing: {
			send: {
				property: 'attach',
				type: 'body',
			},
		},
	},
];

// Here we define what to show when the `list` operation is selected.
const listDocuments: INodeProperties[] = [
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['list'],
			},
		},
		description: 'ID of the template to list documents for',
	},
];

// Here we define what to show when the `get` operation is selected.
const getDocument: INodeProperties[] = [
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get'],
			},
		},
		description: 'The ID of the document to retrieve',
	},
];

// Here we define what to show when the `update` operation is selected.
const updateDocument: INodeProperties[] = [
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['update'],
			},
		},
		description: 'The ID of the document to update',
	},
	{
		displayName: 'Document Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['update'],
			},
		},
		description: 'The new name for the document',
		routing: {
			send: {
				property: 'name',
				type: 'body',
			},
		},
	},
];

// Here we define what to show when the `delete` operation is selected.
const deleteDocument: INodeProperties[] = [
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['delete'],
			},
		},
		description: 'The ID of the document to delete',
	},
];

export const documentFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                document:generate                           */
	/* -------------------------------------------------------------------------- */
	...generateDocument,
	
	/* -------------------------------------------------------------------------- */
	/*                                document:list                               */
	/* -------------------------------------------------------------------------- */
	...listDocuments,

	/* -------------------------------------------------------------------------- */
	/*                                document:get                                */
	/* -------------------------------------------------------------------------- */
	...getDocument,

	/* -------------------------------------------------------------------------- */
	/*                                document:update                             */
	/* -------------------------------------------------------------------------- */
	...updateDocument,

	/* -------------------------------------------------------------------------- */
	/*                                document:delete                             */
	/* -------------------------------------------------------------------------- */
	...deleteDocument,
];