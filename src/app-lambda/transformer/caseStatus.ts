import { APIGatewayEvent } from "aws-lambda";
import { CaseStatusHandlerProps } from "../handler";
import { transformLambdaInputToHandlerInput } from "./common";

export const transformLambdaInputToCaseStatusHandlerInput = (event: APIGatewayEvent, context: any): CaseStatusHandlerProps => {
    const handlerProps = transformLambdaInputToHandlerInput(event, context);
    console.log("Path params: ", event.pathParameters);
    return {
        ...handlerProps,
        receiptNumber: ""
    }
}