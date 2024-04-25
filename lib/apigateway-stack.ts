import { Stack, StackProps } from 'aws-cdk-lib';
import { Cors, LambdaIntegration, LambdaRestApi, Resource, Stage } from 'aws-cdk-lib/aws-apigateway';
import { Function } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { resourceToMethodMap } from './api/api-config';

export interface ApiGatewayStackProps extends StackProps {
    lambdaFunction: Function
}

export class ApiGatewayStack extends Stack {
    constructor(scope: Construct, id: string, props: ApiGatewayStackProps) {
        super(scope, id, props);

        const uscisCaseUpdateAPI = new LambdaRestApi(this, 'uscis-case-update-API', {
            restApiName: "USCIS Case Update API",
            handler: props?.lambdaFunction,
            proxy: false,
            defaultCorsPreflightOptions: {
                allowOrigins: Cors.ALL_ORIGINS,
            },
        });

        const lambdaFunctionIntegration = new LambdaIntegration(props.lambdaFunction);

        resourceToMethodMap.forEach((methods, resource) => {
            const httpResource = this.addResource(uscisCaseUpdateAPI, resource);
            if (httpResource) {
                methods.forEach((method) => {
                    httpResource.addMethod(method, lambdaFunctionIntegration);
                })
            }
        });
    }

    addResource = (api: LambdaRestApi, resource: string): Resource | undefined => {
        let httpResource: Resource | undefined = undefined;
        resource.split("/").forEach((resourceId) => {
            if (httpResource !== undefined) {
                httpResource = httpResource.addResource(resourceId);
            } else {
                httpResource = api.root.addResource(resourceId);
            }
        });
        return httpResource;
    }
}