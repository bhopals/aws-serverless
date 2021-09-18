const AWS = require('aws-sdk')
const S3 = new AWS.S3()
const bucketName = process.env.BUCKET_NAME || 'test-bucket0101'

exports.main = async function (event, context) {

    const method = event.httpMethod || 'GET'

    try {

        if (method === 'GET') {
            if(event.path === '/') {
                const data = await S3.listObjectsV2({Bucket: bucketName}).promise()
                const body = { widgets: data.Contenst.map((e) => e.key)}
                return {
                    statusCode: 200,
                    header: {},
                    body: JSON.stringify(body)
                }
            }
        }

        return {
            statusCode: 404,
            header: {},
            body: JSON.stringify({ message: 'Method Not Found!'})
        }

    } catch (error) {
        const body = error.stack || JSON.stringify(error, null, 2)
        return {
            statusCode: 500,
            header: {},
            body: JSON.stringify(body)
        }
    }
}