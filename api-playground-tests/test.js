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


describe('General Failure Cases', function(){
	it('handles searching for wrong route', async function(){
		try{
			let wrongURL = await request('localhost:3030')
        	.get(`/123`)
		}
		catch(err){
			console.log(err.response.body)
			expect(err).to.have.status(404);
		}        
	})
})



describe('Products API', function () {
  it('can get product by id', async function () {
  	let sampleProductID = 43900
  	
  	const product = await request('localhost:3030')
        .get(`/products/${sampleProductID}`)
  	

    console.log(product.body)
    expect(product).to.have.status(200)
  });
})