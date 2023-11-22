import { expect } from "chai";
import { formatCRONSectionText } from "../../../utils/log";

describe("log to console", () => {
    it("should format the log with correct spacing ", () => {
        const formattedMinute = formatCRONSectionText("minute");
        expect(formattedMinute).to.equal("minute        ");
    });
});
