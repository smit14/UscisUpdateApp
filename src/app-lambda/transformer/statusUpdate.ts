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
    if (!eventBody.receiptNumber || !validateReceiptNumber(eventBody.receiptNumber)) {
        throw new InvalidParameterError("receiptNumber");
    }
    if (!eventBody.email || !validateEmail(eventBody.email)) {
        throw new InvalidParameterError("email");
    }
    return {
        ...handlerProps,
        receiptNumber: eventBody.receiptNumber,
        email: eventBody.email
    }
}

function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const validateReceiptNumber = (receiptNumber: string) => {
    let isValid = true;
    let regPattern = /[a-zA-Z]{3}[0-9]{10}/;
    let asteriskPattern = /[a-zA-Z]{3}\*[0-9]{9}/;

    if (receiptNumber.trim().length === 0) {
        return false;
    }
    if (receiptNumber.trim().length < 13) {
        return false;
    }
    if (!regPattern.test(receiptNumber.trim())) {
        isValid = false;
    }
    if (!isValid && !asteriskPattern.test(receiptNumber.trim())) {
        isValid = false;
    } else {
        isValid = true;
    }

    return isValid;
}