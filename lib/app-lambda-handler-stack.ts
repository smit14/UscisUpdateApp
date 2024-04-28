import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Policy, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path = require('path');
import { TABLE_NAME } from './ddb/ddb-config';

export class AppLambdaHandlerStack extends Stack {
    public readonly lambdaFunction: Function;
    constructor(scope: Construct, id: string, props: StackProps) {
        super(scope, id, props);

        this.lambdaFunction = new NodejsFunction(this, 'UscisStatusUpdateLambda', {
            runtime: Runtime.NODEJS_20_X,
            timeout: Duration.minutes(15),
            entry: path.join(__dirname, '../src/app-lambda/index.ts'),
            handler: 'handler'
        });

        this.addPermissionsToLambdaRole(props.env!!.region!!, props.env!!.account!!)
    }

    addPermissionsToLambdaRole = (region: string, accountId: string) => {
        const ddbPolicy = new PolicyStatement({
          actions: ['dynamodb:*'],
          resources: [`arn:aws:dynamodb:${region}:${accountId}:table/${TABLE_NAME}*`]
        });

        // const sqsPolicy = new PolicyStatement({
        //   actions: ['sqs:*'],
        //   resources: queueArns
        // });

        const secretManagerPolicy = new PolicyStatement({
          actions: ['secretsmanager:*'],
          resources: [`arn:aws:secretsmanager:${region}:${accountId}:secret:plaid*`]
        });

        const evidentlyPolicy = new PolicyStatement({
          actions: ['evidently:EvaluateFeature'],
          resources: [`arn:aws:evidently:${region}:${accountId}:project/SplitzUpApp*`]
        });

        this.lambdaFunction.role?.attachInlinePolicy(new Policy(this, 'lambda-function-policy', {
          statements: [ddbPolicy]
        }));
      }
}