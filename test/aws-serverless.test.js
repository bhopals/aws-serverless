const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert');
const cdk = require('@aws-cdk/core');
const AwsServerless = require('../lib/aws-serverless-stack');

test('Empty Stack - State beofore runing ckd init', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new AwsServerless.AwsServerlessStack(app, 'MyTestStack');
    // THEN
    expect(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
