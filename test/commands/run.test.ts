import { expect, test } from "@oclif/test";

describe("run (from file input)", () => {
    test.stdout()
        .command(["run", "test/inputs/example-A.txt"])
        .it("handles example A correctly", (ctx) => {
            expect(ctx.stdout).to.equal("0,1,NORTH\n");
        });

    test.stdout()
        .command(["run", "test/inputs/example-B.txt"])
        .it("handles example A correctly", (ctx) => {
            expect(ctx.stdout).to.equal("0,0,WEST\n");
        });
});

// TODO: write tests for stdin option (doesn't work with oclif testing library)
