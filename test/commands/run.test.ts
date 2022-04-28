import { expect, test } from "@oclif/test";

describe("run (from file input)", () => {
    const expectEqualWithNewline = (
        ctx: any,
        expected: string
    ): Chai.Assertion => expect(ctx.stdout).to.equal(`${expected}\n`);

    test.stdout()
        .command(["run", "test/inputs/example-A.txt"])
        .it("handles example A correctly", (ctx) => {
            expectEqualWithNewline(ctx, "0,1,NORTH");
        });

    test.stdout()
        .command(["run", "test/inputs/example-B.txt"])
        .it("handles example A correctly", (ctx) => {
            expectEqualWithNewline(ctx, "0,0,WEST");
        });
    test.stdout()
        .command(["run", "test/inputs/invalid-direction.txt"])
        .it("ignores invalid direction", (ctx) => {
            expectEqualWithNewline(ctx, "1,3,WEST");
        });
    test.stdout()
        .command(["run", "test/inputs/invalid-numbers.txt"])
        .it("ignores invalid numbers in coordinates", (ctx) => {
            expectEqualWithNewline(ctx, "1,3,WEST");
        });
    test.stdout()
        .command(["run", "test/inputs/invalid-commands.txt"])
        .it("ignores invalid commands", (ctx) => {
            expectEqualWithNewline(ctx, "1,3,WEST");
        });
    test.stdout()
        .command(["run", "test/inputs/trim-whitespace.txt"])
        .it("trims leading and trailing whitespace", (ctx) => {
            expectEqualWithNewline(ctx, "4,4,EAST");
        });
});

// TODO: write tests for stdin option (doesn't work with oclif testing library)
