import { PARTITION_KEY, SORT_KEY } from "../../../lib/ddb/ddb-config";
import { logError } from "../../common/error";
import { DEPENDENCIES, OPERATIONS } from "../../common/operations";
import { DDbItem, ddbPut } from "./ddbClient";

export const addStatusUpdate = async (receiptNumber: string, email: string): Promise<void> => {
    const ddbItem: DDbItem = {
        [PARTITION_KEY]: buildReceiptKey(receiptNumber),
        [SORT_KEY]: buildEmailKey(email),
        
    }
    try {
        await ddbPut(ddbItem);
    } catch (err) {
        logError(DEPENDENCIES.DDB, OPERATIONS.ADD_STATUS_UPDATE, 'Error while ddbPut', err);
        throw err;
    }
}

const buildReceiptKey = (receiptNumber: string): string => {
    return `receipt#${receiptNumber}`
}

const buildEmailKey = (email: string): string => {
    return `email#${email}`
}