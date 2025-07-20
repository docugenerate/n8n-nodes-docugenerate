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
				resource: ['document']
			}
		},
		options: [
			{
				name: 'Delete Document',
				value: 'delete',
				description: 'Delete a document by ID',
				action: 'Delete document',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/v1/document/{{$parameter.documentId}}'
					}
				}
			},
			{
				name: 'Generate Document',
				value: 'generate',
				description: 'Generate a document from a template',
				action: 'Generate document',
				routing: {
					request: {
						method: 'POST',
						url: '/v1/document'
					}
				}
			},
			{
				name: 'Get Document',
				value: 'get',
				description: 'Get a document by ID',
				action: 'Get document',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/document/{{$parameter.documentId}}'
					}
				}
			},
			{
				name: 'List Documents',
				value: 'list',
				description: 'List documents for a template',
				action: 'List documents',
				routing: {
					request: {
						method: 'GET',
						url: '=/v1/document?template_id={{$parameter.templateId}}'
					}
				}
			},
			{
				name: 'Update Document',
				value: 'update',
				description: 'Update a document by ID',
				action: 'Update document',
				routing: {
					request: {
						method: 'PUT',
						url: '=/v1/document/{{$parameter.documentId}}'
					}
				}
			}
		],
		default: 'generate'
	},
];

// Here we define what to show when the `generate` operation is selected.
// We do that by adding `operation: ["generate"]` to `displayOptions.show`
const generateDocument: INodeProperties[] = [
	{
		displayName: 'Template Name or ID',
		name: 'templateId',
		type: 'options',
		default: '',
		required: true,
		typeOptions: {
			loadOptionsMethod: 'getTemplates',
		},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate']
			}
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
		routing: {
			send: {
				property: 'template_id',
				type: 'body'
			}
		}
	},
	{
		displayName: 'Document Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate']
			}
		},
		description: 'Name of the generated document. Defaults to the template’s name.',
		routing: {
			send: {
				property: 'name',
				type: 'body'
			}
		}
	},
	{
		displayName: 'Document Format',
		name: 'outputFormat',
		type: 'options',
		options: [
			{ name: 'Microsoft Word (.docx)', value: '.docx' },
			{ name: 'Microsoft Word 2007 (.doc)', value: '.doc' },
			{ name: 'OpenDocument Format (.odt)', value: '.odt' },
			{ name: 'PDF (.pdf)', value: '.pdf' },
			{ name: 'Plain Text (.txt)', value: '.txt' },
			{ name: 'PNG (.png)', value: '.png' }
		],
		default: '.docx',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate']
			},
		},
		description: 'Output format of the generated document. Defaults to .docx.',
		routing: {
			send: {
				property: 'output_format',
				type: 'body'
			}
		}
	},
	{
		displayName: 'Document Data',
		name: 'data',
		type: 'json',
		default: '[{\n  "": ""\n}]',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['generate']
			}
		},
		description: 'Data that is used to generate the document',
		routing: {
			send: {
				property: 'data',
				type: 'body'
			}
		}
	}
];

// Here we define what to show when the `list` operation is selected.
const listDocuments: INodeProperties[] = [
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
				resource: ['document'],
				operation: ['list']
			}
		},
		description: 'Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code/expressions/">expression</a>',
	}
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
				operation: ['get']
			}
		},
		description: 'The ID of the document to retrieve'
	}
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
				operation: ['update']
			}
		},
		description: 'The ID of the document to update'
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
				type: 'body'
			}
		}
	}
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
				operation: ['delete']
			}
		},
		description: 'The ID of the document to delete'
	}
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
	...deleteDocument
];