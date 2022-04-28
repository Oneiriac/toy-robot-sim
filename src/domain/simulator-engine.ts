import { Position } from "./model/position";
import ReportPublisher from "./ports/report-publisher";

export default class SimulatorEngine {
    private position?: Position;

    constructor(private readonly reportPublisher: ReportPublisher) {
        this.reportPublisher = reportPublisher;
    }

    public place(position: Position): void {
        this.position = position;
    }

    public move(): void {
        this.throwIfUninitialised(this.position);
        this.position = this.position.withMove();
    }

    public left(): void {
        this.throwIfUninitialised(this.position);
        this.position = this.position.toLeft();
    }

    public right(): void {
        this.throwIfUninitialised(this.position);
        this.position = this.position.toRight();
    }

    public report(): void {
        this.throwIfUninitialised(this.position);
        const message = `${this.position.x},${this.position.y},${this.position.direction}`;
        this.reportPublisher.publish(message);
    }

    private throwIfUninitialised(
        position: Position | undefined
    ): asserts position is Position {
        if (position === undefined || position === null) {
            throw new Error("Robot position not initialised");
        }
    }
}
