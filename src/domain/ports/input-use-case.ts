import { Readable } from "stream";

export default interface InputUseCase {
    readInputStream(input: Readable): Promise<void>;
}
