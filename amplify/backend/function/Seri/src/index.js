const stripe = require('stripe')('sk_test_51KtHVXIv6VEkZcYaYdcSK9vpy6WkBBlHuNwfNhse6iWLFXTXR5SaNTKgrFTOc3ZdbslDahal7KTaBt7Sqojewfiy00Rjb99wZ1')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const {typeName, arguments} = event;

    if (typeName !== 'Mutation') {
        throw new Error('Request is not a mutation');
    }

    if (!arguments?.amount){
        throw new Error('Amount is required')
    }

    //create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.amount,
        currency: 'usd'
    })

    return {
        clientSecret: paymentIntent.client_secret
    }

    // console.log(`EVENT: ${JSON.stringify(event)}`);
    // return {
    //     statusCode: 200,
    // //  Uncomment below to enable CORS requests
    // //  headers: {
    // //      "Access-Control-Allow-Origin": "*",
    // //      "Access-Control-Allow-Headers": "*"
    // //  }, 
    //     body: JSON.stringify('Hello from Lambda!'),
    // };
};
