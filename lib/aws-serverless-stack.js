const cdk = require('@aws-cdk/core');
const { WidgetService } = require('./widget-service')

class AwsServerlessStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    // WIDGET STACK 
    new WidgetService(this, 'Widget')
  }
}

module.exports = { AwsServerlessStack }
