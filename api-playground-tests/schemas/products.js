chai.tv4.addSchema('/products/', {
    title: 'Products API Schema',
    type: 'object',
    required: ['total', 'limit', 'skip', 'data'],
    properties: {
        total: {
            type: 'number',
        },
        limit: {
            type: 'number',
        },
        skip: {
            type: 'number',
        },
        data: {
            type: 'array',
            items: {
                $ref: '//productID',
            }
        }
    }
})

chai.tv4.addSchema('//productID', {
    title: 'Product Item Schema',
    type: 'object',
    required: ['id', 'name', 'type', 'upc', 'description', 'model', 'price'],
    properties: {
        id: {
            type: 'number',
        },
        name: {
            type: 'string',
        },
        type: {
            type: 'string',
        },
        upc: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        model: {
            type: 'string',
        },
        price: {
            type: 'number',
        },
        shipping: {
            type: 'number'
        },
        manufacturer: {
            type: 'string',
        },
        url: {
            type: 'string',
        },
        image: {
            type: 'string',
        },
        createdAt: {
            type: 'string',
        },
        updatedAt: {
            type: 'string',
        },
        categories: {
            type: 'array',
            uniqueItems: true,
            items: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                    },
                    name: {
                        type: 'string',
                    },
                    createdAt: {
                        type: 'string'
                    },
                    updatedAt: {
                        type: 'string'
                    }
                }
            }
        },
    }
})