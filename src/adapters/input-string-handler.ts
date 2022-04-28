import * as readline from "readline";
import { Readable } from "stream";
import { isValidDirection } from "../domain/model/direction";
import { Position } from "../domain/model/position";
import InputUseCase from "../domain/ports/input-use-case";

import SimulatorEngine from "../domain/simulator-engine";
import { ParseError, ParseErrorMessage } from "./parse-error";

const enum Command {
    PLACE = "PLACE",
    MOVE = "MOVE",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    REPORT = "REPORT",
}

function handleLine(line: string, engine: SimulatorEngine): void {
    const commandParts = line.trim().split(" ");
    const command = commandParts[0];
    if (command === undefined) {
        throw new ParseError(ParseErrorMessage.EMPTY);
    }

    switch (command) {
        case Command.PLACE: {
            if (commandParts.length !== 2) {
                throw new ParseError(ParseErrorMessage.INVALID_FORMAT);
            }

            const coordinates = commandParts[1]?.split(",");
            if (coordinates.length !== 3) {
                throw new ParseError(ParseErrorMessage.INVALID_FORMAT);
            }

            const x: number = parseInt(coordinates[0], 10);
            const y: number = parseInt(coordinates[1], 10);
            const maybeDirection = coordinates[2];
            if (!isValidDirection(maybeDirection)) {
                throw new ParseError(ParseErrorMessage.INVALID_DIRECTION);
            }
            const initialPosition = new Position(x, y, maybeDirection);

            engine.place(initialPosition);
            break;
        }

        case Command.MOVE: {
            engine.move();
            break;
        }

        case Command.LEFT: {
            engine.left();
            break;
        }

        case Command.RIGHT: {
            engine.right();
            break;
        }

        case Command.REPORT: {
            engine.report();
            break;
        }
        default:
            throw new ParseError(ParseErrorMessage.INVALID_FORMAT);
    }
}

export default class InputStringHandler implements InputUseCase {
    constructor(private readonly engine: SimulatorEngine) {
        this.engine = engine;
    }

    public async readInputStream(input: Readable): Promise<void> {
        const rl = readline.createInterface({
            input,
            crlfDelay: Number.POSITIVE_INFINITY,
        });

        rl.on("line", (line) => handleLine(line, this.engine));

        return new Promise((resolve) => {
            rl.on("close", () => {
                // Resolve the promise when EOF is reached
                resolve();
            });
        });
    }
}
