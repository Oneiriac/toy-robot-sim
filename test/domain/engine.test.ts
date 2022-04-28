/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect } from "@oclif/test";
import * as sinon from "sinon";
import SimulatorEngine from "../../src/domain/simulator-engine";
import ReportPublisher from "../../src/domain/ports/report-publisher";
import { Position } from "../../src/domain/model/position";
import { Direction } from "../../src/domain/model/direction";

describe("engine", () => {
    const publishStub = sinon.spy();
    const publisher: ReportPublisher = {
        publish: publishStub,
    };
    const engine = new SimulatorEngine(publisher);

    it("should discard all commands until a valid PLACE command is executed", () => {
        const expectCommandToBeIgnored = () => {
            expect(engine.position).to.be.undefined;
            sinon.assert.notCalled(publishStub);
        };

        engine.move();
        expectCommandToBeIgnored();

        engine.left();
        expectCommandToBeIgnored();

        engine.right();
        expectCommandToBeIgnored();

        engine.report();
        expectCommandToBeIgnored();

        const invalidPosition = { x: 5, y: 4, direction: Direction.NORTH };
        engine.place(new Position(invalidPosition));
        expectCommandToBeIgnored();

        const validPosition = { x: 2, y: 4, direction: Direction.NORTH };
        engine.place(new Position(validPosition));
        expect(engine.position).to.include(validPosition);
    });

    it("handles input without any MOVE, LEFT or RIGHT commands correctly", () => {
        const position = { x: 2, y: 4, direction: Direction.NORTH };
        engine.place(new Position(position));
        expect(engine.position).to.include(position);

        engine.report();
        sinon.assert.calledWith(publishStub, "2,4,NORTH");
    });

    it("ignores move that would cause robot to fall", () => {
        const initialPosition = { x: 2, y: 4, direction: Direction.NORTH };
        engine.place(new Position(initialPosition));
        expect(engine.position).to.include(initialPosition);

        // This move would cause the robot to fall and should be ignored
        engine.move();
        expect(engine.position).to.include(initialPosition);
    });

    it("handles LEFT rotation correctly", () => {
        const initialPosition = { x: 3, y: 3, direction: Direction.WEST };
        engine.place(new Position(initialPosition));
        expect(engine.position).to.include(initialPosition);

        engine.left();
        expect(engine.position?.direction).to.eq(Direction.SOUTH);
        engine.left();
        expect(engine.position?.direction).to.eq(Direction.EAST);
        engine.left();
        expect(engine.position?.direction).to.eq(Direction.NORTH);
        engine.left();
        expect(engine.position?.direction).to.eq(Direction.WEST);
    });

    it("handles RIGHT rotation correctly", () => {
        const initialPosition = { x: 3, y: 3, direction: Direction.WEST };
        engine.place(new Position(initialPosition));
        expect(engine.position).to.include(initialPosition);

        engine.right();
        expect(engine.position?.direction).to.eq(Direction.NORTH);
        engine.right();
        expect(engine.position?.direction).to.eq(Direction.EAST);
        engine.right();
        expect(engine.position?.direction).to.eq(Direction.SOUTH);
        engine.right();
        expect(engine.position?.direction).to.eq(Direction.WEST);
    });

    it("moves in the correct direction for all 4 directions", () => {
        engine.place(new Position({ x: 3, y: 3, direction: Direction.WEST }));
        engine.move();
        expect(engine.position).to.include({
            x: 2,
            y: 3,
            direction: Direction.WEST,
        });

        engine.right();
        engine.move();
        expect(engine.position).to.include({
            x: 2,
            y: 4,
            direction: Direction.NORTH,
        });

        engine.right();
        engine.move();
        expect(engine.position).to.include({
            x: 3,
            y: 4,
            direction: Direction.EAST,
        });

        engine.right();
        engine.move();
        expect(engine.position).to.include({
            x: 3,
            y: 3,
            direction: Direction.SOUTH,
        });
    });
});
