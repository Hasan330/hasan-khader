chai.tv4.addSchema('/products', {
    title: 'Product API Schema',
    type: 'object',
    required: ['id', 'name', 'type', 'upc', 'description', 'model', 'price'],
    properties: {
        id: 'number',
        name: 'string',
        type: 'string',
        upc: 'string',
        description: 'string',
        model: 'string',
        price: 'number',
        shipping: 'number',
        manufacturer: 'string',
        url: 'string',
        image: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        categories: 'array'
    }
})