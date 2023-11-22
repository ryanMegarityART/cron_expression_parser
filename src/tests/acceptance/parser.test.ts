import { expect } from "chai";
import { parseInputs } from "../../parser";

describe("parser should expand CRON statements correctly", () => {
    it("expands the statement correctly", () => {
        const {
            parsedMinute,
            parsedHour,
            parsedDayOfMonth,
            parsedMonth,
            parsedDayOfWeek,
            parsedCommand,
        } = parseInputs("*/15", "0", "1,15", "*", "1-5", "/usr/bin/find");
        expect(parsedMinute).to.equal("0 15 30 45");
        expect(parsedHour).to.equal("0");
        expect(parsedDayOfMonth).to.equal("1 15");
        expect(parsedMonth).to.equal("1 2 3 4 5 6 7 8 9 10 11 12");
        expect(parsedDayOfWeek).to.equal("1 2 3 4 5");
        expect(parsedCommand).to.equal("/usr/bin/find");
    });
});
