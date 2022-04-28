import { Command, Flags } from "@oclif/core";
import * as fs from "fs";
import { Readable } from "stream";
import InputStringHandler from "../adapters/input-string-handler";
import StdoutPublisher from "../adapters/stdout-publisher";
import SimulatorEngine from "../domain/simulator-engine";

export default class RunCommand extends Command {
    static description =
        "Run robot simulator with input from either stdin or a text file";

    static examples = [
        `$ echo "PLACE 0,1,NORTH\nREPORT" | robotsim run -s
0,1,NORTH
`,
    ];

    static flags = {
        stdin: Flags.boolean({
            char: "s",
            description: "read stdin",
            required: false,
        }),
    };

    static args = [
        {
            name: "filePath",
            description:
                "input file to parse (if --stdin / -s is not provided)",
            required: false,
        },
    ];

    private stdoutPublisher = new StdoutPublisher();

    private engine = new SimulatorEngine(this.stdoutPublisher);

    private inputParser = new InputStringHandler(this.engine);

    async run(): Promise<void> {
        const { args, flags } = await this.parse(RunCommand);

        let inputStream: Readable;
        if (flags.stdin) {
            // Use stdin as input stream
            inputStream = process.stdin;
        } else {
            // Use provided file as input stream
            inputStream = fs.createReadStream(args.filePath as string);
        }

        await this.inputParser.readInputStream(inputStream);
    }
}
