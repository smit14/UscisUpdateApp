import { Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { 
    PARTITION_KEY, 
    SORT_KEY, 
    TABLE_NAME
} from './ddb/ddb-config';

export class AppDatabaseStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const caseStatusUpdateTable = new Table(this, TABLE_NAME, { 
            tableName: TABLE_NAME,
            partitionKey: { name: PARTITION_KEY, type: AttributeType.STRING },
            sortKey: { name: SORT_KEY, type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
        });
    }
}