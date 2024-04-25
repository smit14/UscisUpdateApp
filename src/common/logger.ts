export const log = (message?: any, ...optionalParams: any[]) => {
    console.log(message, ...optionalParams);
}

export const debug = (message?: any, ...optionalParams: any[]) => {
    console.debug(message, ...optionalParams);
}

export const error = (message?: any, ...optionalParams: any[]) => {
    console.error(message, ...optionalParams);
}