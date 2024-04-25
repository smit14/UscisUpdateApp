import { APIGatewayEvent } from "aws-lambda";
import { InvalidRequestBodyError, InvalidParameterError } from "../../common/error";
import { StatusUpdateHandlerProps } from "../handler";
import { convertToJSON, transformLambdaInputToHandlerInput } from "./common";

export const transformLambdaInputToStatusUpdateHandlerInput = (event: APIGatewayEvent, context: any): StatusUpdateHandlerProps => {
    const handlerProps = transformLambdaInputToHandlerInput(event, context);
    let eventBody;
    try {
        eventBody = convertToJSON(event.body);
    } catch (error: any) {
        throw new InvalidRequestBodyError(error);
    }
    if (!eventBody.receiptNumber) {
        throw new InvalidParameterError("receiptNumber");
    }
    if (!eventBody.email) {
        throw new InvalidParameterError("email");
    }
    return {
        ...handlerProps,
        receiptNumber: eventBody.receiptNumber,
        email: eventBody.email
    }
}