// eslint-disable-next-line import/prefer-default-export
export const enum SimulatorErrorMessage {
    POSITION_NOT_INITIALISED = "Robot position not initialised",
}

export class SimulatorError extends Error {
    constructor(
        errorType: SimulatorErrorMessage,
        ...params: (string | undefined)[]
    ) {
        super(...params);
        this.message = errorType;
    }
}
