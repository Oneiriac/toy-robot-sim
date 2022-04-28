import { Direction, rotateLeft, rotateRight } from "./direction";

export interface PositionProps {
    x: number;
    y: number;
    direction: Direction;
}

export class Position implements PositionProps {
    readonly x: number;

    readonly y: number;

    readonly direction: Direction;

    constructor(x: number, y: number, direction: Direction) {
        this.x = x;
        this.y = y;
        this.direction = direction;

        validatePosition(this);
    }

    toLeft(): this {
        const newDirection = rotateLeft(this.direction);
        return this.withDirection(newDirection);
    }

    toRight(): this {
        const newDirection = rotateRight(this.direction);
        return this.withDirection(newDirection);
    }

    withMove(): this {
        let newX = this.x;
        let newY = this.y;
        switch (this.direction) {
            case Direction.NORTH:
                newY += 1;
                break;
            case Direction.EAST:
                newX += 1;
                break;
            case Direction.SOUTH:
                newY -= 1;
                break;
            case Direction.WEST:
                newX -= 1;
                break;
        }

        const newPosition = {
            x: newX,
            y: newY,
            direction: this.direction,
        };

        validatePosition(newPosition);
        return Object.assign(this, newPosition);
    }

    private withDirection(value: Direction): this {
        return Object.assign(this, { direction: value });
    }
}

const validatePosition = (position: PositionProps): void | never => {
    const validationErrors = [];
    if (position.x < 0) {
        validationErrors.push("x cannot be < 0");
    } else if (position.x > 4) {
        validationErrors.push("x cannot be > 4");
    }

    if (position.y < 0) {
        validationErrors.push("y cannot be < 0");
    } else if (position.y > 4) {
        validationErrors.push("y cannot be > 4");
    }

    if (validationErrors.length === 0) {
        return;
    }

    throw new Error(`Illegal state: ${validationErrors.join(", ")}`);
};
