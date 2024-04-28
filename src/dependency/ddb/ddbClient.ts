import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { PARTITION_KEY, SORT_KEY, TABLE_NAME } from '../../../lib/ddb/ddb-config';

const ddbClient = new DynamoDBClient({
    region: process.env.AWS_REGION
});

const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const ddbPut = async (item: Record<string, any>) => {
    const updatedItem = {
        ...item,
        CreatedTime: getCurrentTimeString()
    }
    await ddbDocClient.send(
        new PutCommand({
            TableName: TABLE_NAME,
            Item: updatedItem
        })
    );
}

export const ddbGet = async (key1: string, key2: string): Promise<DDbItem | undefined> => {
    const ddbItem = await ddbDocClient.send(
        new GetCommand({
            TableName: TABLE_NAME,
            Key: {
                [PARTITION_KEY]: key1,
                [SORT_KEY]: key2
            }
        })
    );
    if (!ddbItem.Item) {
        return undefined;
    }
    return {
        Key1: key1,
        Key2: key2,
        ...ddbItem.Item
    }
}

export interface DDbItem {
    [PARTITION_KEY]: string;
    [SORT_KEY]: string;
    CreatedTime?: string;
    UpdatedTime?: string;
}

export const getCurrentTimeString = (): string => {
    return new Date().toString();
}