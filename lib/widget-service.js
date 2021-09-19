const core = require('@aws-cdk/core')
const apiGateway = require('@aws-cdk/aws-apigateway')
const lambda = require('@aws-cdk/aws-lambda')
const s3 = require('@aws-cdk/aws-s3')


class WidgetService extends core.Construct {

    constructor(scope, id) {
        super(scope, id)

        // S3 Bucket 
        const bucket = new s3.Bucket(this, 'WidgetStore')

        // Lambdad
        const handler =  new lambda.Function(this, 'WidgetHandler', {
            runtime: lambda.Runtime.NODEJS_14_X,
            code: lambda.Code.fromAsset('src'),
            handler: 'widget.main',
            environment: {
                BUCKET: bucket.bucketName
            }
        })
        bucket.grantReadWrite(handler)

        // API Gateway
        const api = new apiGateway.RestApi(this, 'widgets-api', {
            restApiName: 'Widgets Rest API',
            description: 'The Widget API Ends points to trigger Lambda'
        })

        const getApiIntegrationToLambda = new apiGateway.LambdaIntegration(handler, {
            restTemplates: { 'application/json' : '{ statusCode: 200 }'}
        })

        api.root.addMethod('GET', getApiIntegrationToLambda)
    }
}

module.exports = { WidgetService }