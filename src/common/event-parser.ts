import { APIGatewayEvent } from "aws-lambda";

export interface Userdata {
    username?: string;
    email?: string;
}

export const retrieveUserData = (event: APIGatewayEvent): Userdata => {
    return {
        username: event.requestContext.authorizer?.claims["cognito:username"],
        email: event.requestContext.authorizer?.claims["email"],
    }
}