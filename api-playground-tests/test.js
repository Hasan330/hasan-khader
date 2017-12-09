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

chai.tv4.banUnknown = true;
chai.tv4.multiple = false;
chai.tv4.cyclicCheck = false;


describe('General Failure Cases', function() {
    it('Handles searching for wrong route', async function() {
        try {
            let wrongURL = await request('localhost:3030')
                .get(`/123`)
        } catch (err) {
            // console.log(err.response.body)
            expect(err).to.have.status(404)
        }
    })
})


describe('Products API', function() {
    const sampleProductID = 48530;
    let productResponse;

    it('Gets product by id', async function() {
        productResponse = await request('localhost:3030')
            .get(`/products/${sampleProductID}`)

        expect(productResponse)
            .to.have.status(200)
            .and.to.have.property('body')
            .and.to.include({ id: sampleProductID })
    });


    it('Matches product schema', async function() {
    	const productSchema = chai.tv4.getSchema('/products')
    	console.log('productResponse', productResponse.body)
    	console.log('productSchema', productSchema)
    	expect(productResponse.body).to.be.jsonSchema(productSchema)
    })


    it('Fails on searching for wrong product', async function() {
        let wrongProductID = 'wrongproduct'
        try {
            const product = await request('localhost:3030')
                .get(`/products/${wrongProductID}`)
        } catch (err) {
            expect(err)
                .to.have.status(404)
        }
    })

    it('Fails to add product with missing fields to the products API', async function() {
        let newProductID = 1
        try {
            await request('localhost:3030')
                .put(`/products/${newProductID}`)
        } catch (err) {
            // console.log(err.response.body)
            expect(err)
                .to.have.status(400)
                .and.to.nested.include({ 'response.body.message': 'Invalid Parameters' });
        }
    })

    it('Updates product in the products API', async function() {
        let productID = 43900
        const response = await request('localhost:3030')
            .put(`/products/${productID}`)
            .send({
                name: 'Test product',
                type: 'Testing',
                upc: '421',
                description: 'A super cool product',
                model: '330',
                price: 200,
                shipping: 22,
                manufacturer: 'Duracel',
            })
    })


    it('Gets to product API', async function() {
        const product = await request('localhost:3030')
            .get(`/products/`)

        expect(product).to.have.status(200)
    })
})

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