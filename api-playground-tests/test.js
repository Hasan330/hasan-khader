const assert = require('assert');
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiJsonSchema = require('chai-json-schema');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiJsonSchema);
chai.use(chaiAsPromised);
chai.use(chaiHttp);


const expect = chai.expect;
const request = chai.request
const appURL = 'localhost:3030';


//Testing the Healthcheck Route
describe('Healthcheck Route', function() {
    let healthcheckResponse;
    it('Checks route stability', async function() {
        healthcheckResponse = await request(appURL)
            .get(`/healthcheck`)


        expect(healthcheckResponse).to.have.status(200)
    })

    it('Checks healthcheks schema', function() {
        const schema = chai.tv4.getSchema('/healthcheck')

        expect(healthcheckResponse.body).to.be.jsonSchema(schema)
    })
})



//Testing general failure cases such as searching for wrong routes
describe('General Failure Cases', function() {
    it('Handles searching for wrong route', async function() {
        try {
            let wrongURL = await request(appURL)
                .get(`/123`)
        } catch (err) {
            // console.log(err.response.body)
            expect(err).to.have.status(404)
            .and.to.nested.include({ 'response.body.name': 'NotFound' });
        }
    })
})



//Testing the Product's Route
describe('Products API', function() {
    let productResponse;
    let newProductID;


    it('Gets to products list', async function() {
        productResponse = await request(appURL)
            .get(`/products`)

        expect(productResponse).to.have.status(200)
    })


    it('Conforms to products schema', function() {
        const schema = chai.tv4.getSchema('/products')
        expect(productResponse.body).to.be.jsonSchema(schema)
    })


    it('Limits response to 10 items', function() {
        expect(productResponse).to.nested.include({ 'body.limit': 10 });
    })


    it('Fails on searching for wrong product', async function() {
        let wrongProductID = 'wrongproduct'
        try {
            const product = await request(appURL)
                .get(`/products/${wrongProductID}`)
        } catch (err) {
            expect(err)
                .to.have.status(404)
                .and.to.nested.include({ 'response.body.name': 'NotFound' });
        }
    })


    it('Gets product by id', async function() {
        const sampleProductID = 48530;
         productResponse = await request(appURL)
            .get(`/products/${sampleProductID}`)

        expect(productResponse)
            .to.have.status(200)
            .and.to.have.property('body')
            .and.to.include({ id: sampleProductID })
    });


    it('Matches product schema', function() {
        const productSchema = chai.tv4.getSchema('//productID')
        expect(productResponse.body).to.be.jsonSchema(productSchema)
    })


    it('Adds a product to the products API', async function() {
        const response = await request(appURL)
            .post(`/products/`)
            .send({
                name: 'Newly Added Product',
                type: 'Testing 2',
                upc: '421',
                description: 'A super cool product',
                model: '330',
                price: 200,
                shipping: 22,
                manufacturer: 'Duracel',
                url: 'someurl.com',
                image: 'some-image'
            })

        expect(response).to.have.status(201)
            .and.to.nested.include({ 'body.name': 'Newly Added Product' });
        newProductID = response.body.id;
    });


    it('Fails to update product with missing fields to the products API', async function() {
        try {
            await request(appURL)
                .put(`/products/${newProductID}`)
        } catch (err) {
            // console.log(err.response.body)
            expect(err)
                .to.have.status(400)
                .and.to.nested.include({ 'response.body.message': 'Invalid Parameters' });
        }
    })


    it('Updates product in the products API when correct fields are sent', async function() {
        const response = await request(appURL)
            .put(`/products/${newProductID}`)
            .send({
                name: 'Updated product',
                type: 'Testing',
                upc: '421',
                description: 'A super cool product',
                model: '330',
                price: 200,
                shipping: 22,
                manufacturer: 'Duracel',
                url: 'someurl.com',
                image: 'some-image'
            })

        //Assert product was updated correctly
        expect(response).to.have.status(200)
            .and.to.nested.include({ 'body.name': 'Updated product' })
    })


    it('Deletes added product successfuly', async function() {
        const response = await request(appURL)
            .delete(`/products/${newProductID}`)

        expect(response).to.have.status(200)
    })


    it('Fails on searching for deleted product', async function() {
        try {
            const product = await request(appURL)
                .get(`/products/${newProductID}`)
        } catch (err) {
            expect(err)
                .to.have.status(404)
                .and.to.nested.include({ 'response.body.name': 'NotFound' });
        }
    })

})


//TODO
describe('Categories API', function() {
    //TODO: Add test cases
    it('To be added', function() {

    })
})

//TODO
describe('Stores API', function() {
    //TODO: Add test cases
    it('To be added', function() {

    })
})

//TODO
describe('Services API', function() {
    //TODO: Add test cases
    it('To be added', function() {

    })
})



chai.tv4.addSchema('/products', {
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


chai.tv4.addSchema('/healthcheck', {
    title: 'Healthcheck API',
    type: 'object',
    required: ['uptime', 'readonly', 'documents'],
    properties: {
        uptime: {
            type: 'number',
        },
        readonly: {
            type: 'boolean'
        },
        documents: {
            type: 'object',
            properties: {
                products: {
                    type: 'number'
                },
                stores: {
                    type: 'number'
                },
                categories: {
                    type: 'number'
                }
            }
        }
    }
})