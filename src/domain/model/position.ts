import { Direction, rotateLeft, rotateRight } from "./direction";

export interface PositionProps {
    x: number;
    y: number;
    direction: Direction;
}

/**
 * This is an opaque type that can only be created by validating {@link PositionProps} with {@link isValidPosition}.
 * Implemented using hackery from https://stackoverflow.com/a/49432424
 */
export type ValidPositionProps = PositionProps & { isValid: true };

const isValidPosition = (
    position: PositionProps
): position is ValidPositionProps => {
    const validationErrors = [];
    // Integer checks
    if (!Number.isInteger(position.x)) {
        validationErrors.push("x must be an integer");
    }
    if (!Number.isInteger(position.y)) {
        validationErrors.push("y must be an integer");
    }

    // Range checks
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

    return validationErrors.length === 0;
};

export class ValidPosition implements ValidPositionProps {
    readonly x: number;

    readonly y: number;

    readonly direction: Direction;

    readonly isValid = true;

    constructor(validPositionProps: ValidPositionProps) {
        const { x, y, direction } = validPositionProps;
        this.x = x;
        this.y = y;
        this.direction = direction;
    }

    static from(positionProps: PositionProps): ValidPosition | null {
        if (isValidPosition(positionProps)) {
            return new ValidPosition(positionProps);
        }
        return null;
    }

    toLeft(): this {
        const newDirection = rotateLeft(this.direction);
        return this.withDirection(newDirection);
    }

    toRight(): this {
        const newDirection = rotateRight(this.direction);
        return this.withDirection(newDirection);
    }

    withMove(): this | null {
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

        if (!isValidPosition(newPosition)) {
            // Return null and let the caller deal with it
            return null;
        }

        return Object.assign(this, newPosition);
    }

    private withDirection(value: Direction): this {
        return Object.assign(this, { direction: value });
    }
}
