import { DEPENDENCIES, OPERATIONS } from "./operations";

export class PlaidInitializationError extends Error {
    constructor(message: string) {
        super(`Error while initializing plaid client: ${message}`);
    }
}

export class InvalidParameterError extends Error {
    constructor(message: string) {
        super(`Invalid parameter: ${message}`);
    }
}

export class InvalidRequestBodyError extends Error {
    constructor(message: string) {
        super(`Invalid request body: ${message}`);
    }
}

export class InvalidDDbItemError extends Error {
    constructor(message: string) {
        super(`Item doesn't have key ${message}`);
    }
}

export class InvalidExclusiveStartTransaction extends Error {
    constructor(message: string) {
        super(`InvalidExclusiveStartTransaction ${message}`);
    }
}

export class QueueIdExistsError extends Error {
    constructor() {
        super();
    }
}

export class QueueIdDoesNotExistsError extends Error {
    constructor() {
        super();
    }
}

export class ItemLoginRequiredError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class ItemAlreadyRemovedError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export const logError = (dependency: DEPENDENCIES, operation: OPERATIONS, message: string, err: any) => {
    console.log(`[${dependency}] [${operation}] ${message}`);
    console.log(err);
}