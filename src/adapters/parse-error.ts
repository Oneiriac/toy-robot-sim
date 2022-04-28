export const enum ParseErrorMessage {
    EMPTY = "Empty line",
    INVALID_FORMAT = "Invalid format",
    INVALID_DIRECTION = "Invalid direction",
}

export class ParseError extends Error {
    constructor(
        errorType: ParseErrorMessage,
        ...params: (string | undefined)[]
    ) {
        super(...params);
        this.message = errorType;
    }
}
