import { PositionProps, ValidPosition } from "./model/position";
import ReportPublisher from "./ports/report-publisher";

export default class SimulatorEngine {
    position?: ValidPosition;

    constructor(private readonly reportPublisher: ReportPublisher) {
        this.reportPublisher = reportPublisher;
    }

    public place(position: PositionProps): void {
        const newPosition = ValidPosition.from(position);
        if (newPosition !== null) {
            this.position = newPosition;
        }
    }

    public move(): void {
        this.runIfInitialised((position) => {
            const newPosition = position.withMove();
            if (newPosition !== null) {
                this.position = newPosition;
            }
        });
    }

    public left(): void {
        this.runIfInitialised((position) => {
            this.position = position.toLeft();
        });
    }

    public right(): void {
        this.runIfInitialised((position) => {
            this.position = position.toRight();
        });
    }

    public report(): void {
        this.runIfInitialised((position) => {
            const message = `${position.x},${position.y},${position.direction}`;
            this.reportPublisher.publish(message);
        });
    }

    /**
     * If the engine has been initialised (i.e. this.position is not undefined or null), runs the specified callback with the value of {@link this.position}.
     * Otherwise, skips the callback.
     * @param callback if {@link this.position} is not undefined or null, it will be passed to this callback
     * @returns {T}
     */
    private runIfInitialised<T = void>(
        callback: (initialisedPosition: ValidPosition) => T
    ): T | undefined {
        if (this.position === undefined || this.position === null) {
            return undefined;
        }
        return callback(this.position);
    }
}
