export enum Direction {
    NORTH = "NORTH",
    SOUTH = "SOUTH",
    EAST = "EAST",
    WEST = "WEST",
}

export const isValidDirection = (input: string): input is Direction =>
    Object.values(Direction).includes(input as Direction);

export const rotateLeft = (initialDirection: Direction): Direction => {
    switch (initialDirection) {
        case Direction.NORTH:
            return Direction.WEST;
        case Direction.WEST:
            return Direction.SOUTH;
        case Direction.SOUTH:
            return Direction.EAST;
        case Direction.EAST:
            return Direction.NORTH;
    }
};

export const rotateRight = (initialDirection: Direction): Direction => {
    switch (initialDirection) {
        case Direction.NORTH:
            return Direction.EAST;
        case Direction.EAST:
            return Direction.SOUTH;
        case Direction.SOUTH:
            return Direction.WEST;
        case Direction.WEST:
            return Direction.NORTH;
    }
};
