import { APIGatewayEvent, APIGatewayProxyResult, Context } from "aws-lambda";
import { Resources } from "../../../lib/api/api-config";
import { handler as caseStatusHandler } from "./caseStatus";
import { handler as statusUpdateHandler } from "./statusUpdate";

type handlerFunctionType = (event: APIGatewayEvent, context: Context) => Promise<APIGatewayProxyResult>;

const resourceToHandlerMap = new Map<Resources, handlerFunctionType>([
    [Resources.CaseStatus, caseStatusHandler],
    [Resources.StatusUpdate, statusUpdateHandler]
]);

export const getResourceHandler = (path: string): handlerFunctionType | undefined => {
    if ((<any>Object).values(Resources).includes(path)) {
        return resourceToHandlerMap.get(path as Resources);
    }
    return undefined;
}

export interface HandlerProps {
    requestMethod: string;
}

export interface CaseStatusHandlerProps extends HandlerProps {
    receiptNumber: string;
}

export interface StatusUpdateHandlerProps extends HandlerProps {
    receiptNumber: string;
    email: string;
}