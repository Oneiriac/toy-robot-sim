import { Position } from "./model/position";
import ReportPublisher from "./ports/report-publisher";

export default class SimulatorEngine {
    position?: Position;

    constructor(private readonly reportPublisher: ReportPublisher) {
        this.reportPublisher = reportPublisher;
    }

    public place(position: Position): void {
        this.position = position;
    }

    public move(): void {
        this.assertInitalised();
        this.position = this.position.withMove();
    }

    public left(): void {
        this.assertInitalised();
        this.position = this.position.toLeft();
    }

    public right(): void {
        this.assertInitalised();
        this.position = this.position.toRight();
    }

    public report(): void {
        this.assertInitalised();
        const message = `${this.position.x},${this.position.y},${this.position.direction}`;
        this.reportPublisher.publish(message);
    }

    private assertInitalised(): asserts this is { position: Position } {
        if (this.position === undefined || this.position === null) {
            throw new Error("Robot position not initialised");
        }
    }
}
