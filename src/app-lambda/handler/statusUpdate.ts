import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { StatusUpdateHandlerProps } from ".";
import { HttpRequestMethod } from "../../../lib/api/api-config";
import { InvalidParameterError, InvalidRequestBodyError } from "../../common/error";
import { addStatusUpdate } from "../../dependency/ddb/ddbHelper";
import { transformLambdaInputToStatusUpdateHandlerInput } from "../transformer/statusUpdate";
import { generateOkResponse, generateInternalServerErrorResponse, generateClientErrorResponse } from "../util/responseGenerator";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    let handlerProps: StatusUpdateHandlerProps
    try {
        handlerProps = transformLambdaInputToStatusUpdateHandlerInput(event, context);
    } catch (error: any) {
        console.log("error while transforming input to handler input", error);
        if (error instanceof InvalidRequestBodyError) {
            return generateClientErrorResponse({error: "Invalid request body"});
        }
        if (error instanceof InvalidParameterError) {
            return generateClientErrorResponse({error: error.message});
        }
        return generateInternalServerErrorResponse({});
    }

    const {requestMethod, receiptNumber, email} = handlerProps
    if (requestMethod === HttpRequestMethod.POST) {
        try {
            await addStatusUpdate(receiptNumber, email);
            return generateOkResponse({});
        } catch (err){
            console.log(err);
            return generateInternalServerErrorResponse({})
        }
    } else {
        return generateInternalServerErrorResponse({})
    }
}