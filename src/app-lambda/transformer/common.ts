import { APIGatewayEvent } from "aws-lambda";
import { HandlerProps } from "../handler";

export const transformLambdaInputToHandlerInput = (event: APIGatewayEvent, context: any): HandlerProps => {
    return {
        requestMethod: event.httpMethod
    };
}

export const convertToJSON = (body?: any): any => {
    if (!body) {
        return {};
    }
    return JSON.parse(body);
}

export const getQueryParameter = (event: APIGatewayEvent, paramKey: string): string | undefined => {
    return event.queryStringParameters && event.queryStringParameters[paramKey] ? decodeURIComponent(event.queryStringParameters[paramKey]!) : undefined;
}
