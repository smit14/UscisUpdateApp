import { APIGatewayProxyResult } from "aws-lambda"

const enum HttpStatusCode {
    OK = 200,
    InternalError = 500,
    ClientError = 400,
    ForBidded = 403
}

const corsHeader = {
    'Access-Control-Allow-Origin': '*',
}

export const generateOkResponse = (response: any): APIGatewayProxyResult => {
    return {
        statusCode: HttpStatusCode.OK,
        body: `${JSON.stringify(response)}`,
        headers: corsHeader
    }
}

export const generateInternalServerErrorResponse = (response: any): APIGatewayProxyResult => {
    return {
        statusCode: HttpStatusCode.InternalError,
        body: JSON.stringify(response),
        headers: corsHeader
    }
}

export const generateClientErrorResponse = (response: any): APIGatewayProxyResult => {
    return {
        statusCode: HttpStatusCode.ClientError,
        body: JSON.stringify(response),
        headers: corsHeader
    }
}

export const generateForBiddedErrorResponse = (response: any): APIGatewayProxyResult => {
    return {
        statusCode: HttpStatusCode.ForBidded,
        body: JSON.stringify(response),
        headers: corsHeader
    }
}