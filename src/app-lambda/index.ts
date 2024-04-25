import { Context } from "aws-lambda/handler";
import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { getResourceHandler } from "./handler";
import { generateInternalServerErrorResponse } from "./util/responseGenerator";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    console.log(event);
    const resourceHandler = getResourceHandler(event.resource.substring(1));
    if (resourceHandler) {
        return await resourceHandler(event, context);
    } else {
        console.log(`Couldn't find handler for resource ${event.resource}`);
        return generateInternalServerErrorResponse({});
    }
}