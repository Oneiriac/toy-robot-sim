import ReportPublisher from "../domain/ports/report-publisher";

export default class StdoutPublisher implements ReportPublisher {
    publish(report: string): void {
        console.log(report);
    }
}
