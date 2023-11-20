import { expect } from "chai";
import { parseCommand } from "../../parsers/command";

describe("command is parsed correctly", () => {
    it("returns input given since no parsing currenlty required", () => {
        const parsedCommand = parseCommand("commandString");
        expect(parsedCommand).to.equal("commandString");
    });
});
