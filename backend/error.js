// for creating own messages for error handling

export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}