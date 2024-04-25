import { APIGatewayEvent } from "aws-lambda";
import { InvalidParameterError } from "../../common/error";
import { CaseStatusHandlerProps } from "../handler";
import { transformLambdaInputToHandlerInput } from "./common";

export const transformLambdaInputToCaseStatusHandlerInput = (event: APIGatewayEvent, context: any): CaseStatusHandlerProps => {
    const handlerProps = transformLambdaInputToHandlerInput(event, context);
    if (!event.pathParameters?.receiptNumber) {
        throw new InvalidParameterError("Invalid receipt number");
    }
    return {
        ...handlerProps,
        receiptNumber: event.pathParameters?.receiptNumber
    }
}