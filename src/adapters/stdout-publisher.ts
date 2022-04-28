import ReportPublisher from "../domain/ports/report-publisher";

export default class StdoutPublisher implements ReportPublisher {
    // eslint-disable-next-line class-methods-use-this
    publish(report: string): void {
        // eslint-disable-next-line no-console
        console.log(report);
    }
}
