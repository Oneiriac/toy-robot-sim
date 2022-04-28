import * as readline from "readline";
import { Readable } from "stream";
import { isValidDirection } from "../domain/model/direction";
import InputUseCase from "../domain/ports/input-use-case";

import SimulatorEngine from "../domain/simulator-engine";
import ParseError from "./errors";

const enum Command {
    PLACE = "PLACE",
    MOVE = "MOVE",
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    REPORT = "REPORT",
}

const tryParseInteger = (value: string): number | null => {
    if (!/^\d+$/.test(value)) {
        return null;
    }
    return Number.parseInt(value, 10);
};

/**
 * TODO: log these parse errors somewhere? (maybe when an optional debug flag is provided)
 * @param line
 * @param engine
 * @returns true if line successfully parsed, or a {@link ParseError} if not successful.
 */
const handleLine = (
    line: string,
    engine: SimulatorEngine
): true | ParseError => {
    const commandParts = line.trim().split(" ");
    const command = commandParts[0];
    if (command === undefined) {
        return ParseError.EMPTY;
    }

    switch (command) {
        case Command.PLACE: {
            if (commandParts.length !== 2) {
                return ParseError.TOO_MANY_PARTS;
            }

            const coordinates = commandParts[1]?.split(",");
            if (coordinates.length !== 3) {
                return ParseError.INVALID_COORDINATES_FORMAT;
            }

            const x = tryParseInteger(coordinates[0]);
            const y = tryParseInteger(coordinates[1]);
            const direction: string = coordinates[2];

            if (x === null || y === null) {
                return ParseError.INVALID_NUMBER_FORMAT;
            }
            // TODO: see whether it makes sense for domain model to be here
            if (!isValidDirection(direction)) {
                return ParseError.INVALID_DIRECTION;
            }
            engine.place({ x, y, direction });
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
            return ParseError.INVALID_COMMAND;
    }
    return true;
};

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
