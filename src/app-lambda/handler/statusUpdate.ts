import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { StatusUpdateHandlerProps } from ".";
import { HttpRequestMethod } from "../../../lib/api/api-config";
import { InvalidRequestBodyError } from "../../common/error";
import { transformLambdaInputToStatusUpdateHandlerInput } from "../transformer/statusUpdate";
import { generateOkResponse, generateInternalServerErrorResponse, generateClientErrorResponse } from "../util/responseGenerator";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    let handlerProps: StatusUpdateHandlerProps
    try {
        handlerProps = transformLambdaInputToStatusUpdateHandlerInput(event, context);
    } catch (error: any) {
        console.log("error while transforming input to handler input", error);
        if (error instanceof InvalidRequestBodyError) {
            throw generateClientErrorResponse({error: "Invalid request body"});
        }
        return generateInternalServerErrorResponse({});
    }

    const {requestMethod, receiptNumber, email} = handlerProps
    if (requestMethod === HttpRequestMethod.POST) {
        try {
            console.log(receiptNumber);
            console.log(email);
            return generateOkResponse({
                
            });
        } catch (err){
            console.log(err);
            return generateInternalServerErrorResponse({})
        }
    } else {
        return generateInternalServerErrorResponse({})
    }
}