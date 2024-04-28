import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { CaseStatusHandlerProps } from ".";
import { HttpRequestMethod } from "../../../lib/api/api-config";
import { InvalidRequestBodyError } from "../../common/error";
import { getCaseStatus } from "../../dependency/uscis";
import { transformLambdaInputToCaseStatusHandlerInput } from "../transformer/caseStatus";
import { generateOkResponse, generateInternalServerErrorResponse, generateClientErrorResponse } from "../util/responseGenerator";

export const handler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {

    let handlerProps: CaseStatusHandlerProps
    try {
        handlerProps = transformLambdaInputToCaseStatusHandlerInput(event, context);
    } catch (error: any) {
        console.log("error while transforming input to handler input", error);
        if (error instanceof InvalidRequestBodyError) {
            return generateClientErrorResponse({error: "Invalid request body"});
        }
        return generateInternalServerErrorResponse({});
    }

    const {requestMethod, receiptNumber} = handlerProps
    if (requestMethod === HttpRequestMethod.GET) {
        try {
            const response = await getCaseStatus(receiptNumber);
            return generateOkResponse(response);
        } catch (err){
            console.log(err);
            return generateInternalServerErrorResponse({})
        }
    } else {
        return generateInternalServerErrorResponse({})
    }
}