import { expect } from "chai";
import { formatParsedValuesForLogging } from "../../utils/log";

describe("log to console", () => {
    it("should format the log correctly for console.table", () => {
        const objectToLog = formatParsedValuesForLogging(
            "parsedMinute",
            "parsedHour",
            "parsedDayOfMonth",
            "parsedMonth",
            "parsedDayOfWeek",
            "parsedCommand"
        );
        expect(objectToLog).to.deep.equal({
            minute: "parsedMinute",
            hour: "parsedHour",
            dayOfMonth: "parsedDayOfMonth",
            month: "parsedMonth",
            dayOfWeek: "parsedDayOfWeek",
            command: "parsedCommand",
        });
    });
});
