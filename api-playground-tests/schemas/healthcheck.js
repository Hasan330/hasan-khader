chai.tv4.addSchema('/healthcheck', {
    title: 'Healthcheck API',
    type: 'object',
    required: ['uptime', 'readonly', 'documents'],
    properties:{
        uptime:{
            type: 'number',
        },
        readonly:{
            type: 'boolean'
        },
        documents:{
            type: 'object',
            properties:{
                products:{
                    type: 'number'
                },
                stores:{
                    type: 'number'
                },
                categories:{
                    type: 'number'
                }
            }
        }
    }
})