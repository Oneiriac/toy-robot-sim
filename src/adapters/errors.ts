const enum ParseError {
    EMPTY = "Empty line",
    INVALID_NUMBER_FORMAT = "Invalid number format in coordinates: must be integer",
    INVALID_COORDINATES_FORMAT = "Invalid coordinates format: must be in format [X],[Y],[DIRECTION]",
    TOO_MANY_PARTS = "Invalid format: too many command parts provided",
    INVALID_DIRECTION = "Invalid direction",
    INVALID_COMMAND = "Invalid command",
}
export default ParseError;
